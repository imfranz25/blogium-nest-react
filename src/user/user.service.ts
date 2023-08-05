import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.to';
import { PrismaService } from '../common/prisma/prisma.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { userSelection } from '../common/prisma/prismaSelect';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, birthday, ...newUser } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password does not match',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      return await this.prisma.user.create({
        data: {
          ...newUser,
          hashedPassword,
          birthday: new Date(birthday),
        },
      });
    } catch (error) {
      console.log(error);

      if (error.code === 'P2002') {
        throw new ConflictException('Email already taken');
      }

      throw new BadRequestException();
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: userSelection,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);

      if (error.code === 'P2023') {
        throw new NotFoundException('User does not exist');
      }

      throw new BadRequestException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { profilePicture, ...userDetails } = updateUserDto;
    const updatedUserDetails: UpdateUserDto = { ...userDetails };
    let uploadedProfilePic;

    /* If there is file uploaded -> upload via cloudinary */
    if (profilePicture) {
      uploadedProfilePic = await this.cloudinary.uploadImage(profilePicture);
    }

    /* If file upload succeeded -> save the url -> DB */
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
        throw new ConflictException('Email already taken');
      }

      throw new BadRequestException();
    }
  }

  async updatePassword(id: string, updatePasswordDto: UpdateUserPasswordDto) {
    const { newPassword, confirmNewPassword, oldPassword } = updatePasswordDto;

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException(
        'Password and confirm password does not match',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const isOldPasswordMatch = await bcrypt.compare(
      oldPassword,
      existingUser.hashedPassword,
    );

    if (!isOldPasswordMatch) {
      throw new BadRequestException('Invalid old password');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    return await this.prisma.user.update({
      where: { id },
      data: { hashedPassword: newHashedPassword },
    });
  }
}
