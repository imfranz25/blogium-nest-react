import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, ...newUser } = createUserDto;

    if (password !== confirmPassword) {
      throw new PrismaClientValidationError();
    }

    const hashedPassword = await hash(password, 12);

    return this.prisma.user.create({
      data: { ...newUser, hashedPassword },
    });
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
