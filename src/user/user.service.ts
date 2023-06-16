import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinary: CloudinaryService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, birthday, ...newUser } = createUserDto;

    if (password !== confirmPassword) {
      throw new HttpException(
        { message: ['Password and confirm password does not match'] },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      return await this.prisma.user.create({
        data: { ...newUser, hashedPassword, birthday: new Date(birthday) },
      });
    } catch (error) {
      console.log(error);

      if (error.code === 'P2002') {
        throw new HttpException(
          { message: ['Email already taken'] },
          HttpStatus.CONFLICT,
        );
      }

      throw new BadRequestException();
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          profilePicture: true,
          firstName: true,
          lastName: true,
          birthday: true,
          bio: true,
          email: true,
          Post: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              User: {
                select: {
                  profilePicture: true,
                  firstName: true,
                  lastName: true,
                },
              },
              Like: true,
              Comment: {
                select: {
                  id: true,
                  comment: true,
                  createdAt: true,
                  User: {
                    select: {
                      profilePicture: true,
                      firstName: true,
                      lastName: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new HttpException(
          { message: ['User not found'] },
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      if (error.code === 'P2023') {
        throw new HttpException(
          { message: ['User does not exist'] },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new BadRequestException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { profilePicture, ...userDetails } = updateUserDto;
    const updatedUserDetails: UpdateUserDto = { ...userDetails };
    let uploadedProfilePic;

    if (profilePicture) {
      uploadedProfilePic = await this.cloudinary
        .uploadImage(profilePicture.file.thumbUrl)
        .catch((error) => {
          console.log(error);
          throw new BadRequestException('Invalid file type.');
        });
    }

    if (uploadedProfilePic) {
      updatedUserDetails.profilePicture = uploadedProfilePic.url;
    }

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updatedUserDetails,
      });

      return {
        accessToken: this.jwtService.sign({
          userId: user.id,
          email: user.email,
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          birthday: user.birthday,
        }),
      };
    } catch (error) {
      console.log(error);

      if (error.code === 'P2002') {
        throw new HttpException(
          { message: ['Email already taken'] },
          HttpStatus.CONFLICT,
        );
      }

      throw new BadRequestException();
    }
  }
}
