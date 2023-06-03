import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  private readonly includeOptions = Object.freeze({
    User: Object.freeze({
      select: Object.freeze({
        profilePicture: true,
        firstName: true,
        lastName: true,
      }),
    }),
    Like: true,
  });

  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        userId,
        post: createPostDto.post,
      },
      include: this.includeOptions,
    });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: this.includeOptions,
    });
  }

  async findOne(id: string) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: this.includeOptions,
    });
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto) {
    await this.prisma.post.updateMany({
      where: { id, userId },
      data: updatePostDto,
    });

    return { id, ...updatePostDto };
  }

  async remove(id: string, userId: string) {
    return await this.prisma.post.deleteMany({
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
