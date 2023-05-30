import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        userId,
        post: createPostDto.post,
      },
    });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.updateMany({
      where: { id, userId },
      data: updatePostDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.prisma.post.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async like(postId: string, userId: string) {
    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async unlike(postId: string, userId: string) {
    return this.prisma.like.deleteMany({
      where: {
        userId,
        postId,
      },
    });
  }
}
