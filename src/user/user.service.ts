import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, ...newUser } = createUserDto;

    if (password !== confirmPassword) {
      throw new HttpException(
        { message: ['Password and confirm password does not match'] },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: { ...newUser, hashedPassword },
    });
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        { message: ['User not found'] },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}

// findAll() {
//   return `This action returns all user`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} user`;
// }

// remove(id: number) {
//   return `This action removes a #${id} user`;
// }
