import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CommentPostDto } from './dto/comment-post.dto';

@Injectable()
export class PostService {
  private readonly includeOptions: Prisma.PostInclude = {
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
      orderBy: {
        createdAt: 'desc',
      },
    },
  };

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
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    try {
      return await this.prisma.post.findUnique({
        where: { id },
        include: this.includeOptions,
      });
    } catch (error) {
      console.error(error);

      if (error.code === 'P2023') {
        throw new HttpException(
          { message: ['Post does not exist'] },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new BadRequestException();
    }
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.updateMany({
      where: { id, userId },
      data: updatePostDto,
    });
  }

  async remove(id: string, userId: string) {
    return await this.prisma.post.deleteMany({
      where: { id, userId },
    });
  }

  async like(postId: string, userId: string) {
    return await this.prisma.like.create({
      data: { userId, postId },
    });
  }

  async unlike(postId: string, userId: string) {
    return await this.prisma.like.deleteMany({
      where: { userId, postId },
    });
  }

  async addComment(
    userId: string,
    postId: string,
    commentPostDto: CommentPostDto,
  ) {
    return await this.prisma.comment.create({
      data: {
        userId,
        postId,
        ...commentPostDto,
      },
      select: {
        id: true,
        comment: true,
        userId: true,
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
    });
  }
}
