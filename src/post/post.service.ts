import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CommentPostDto } from './dto/comment-post.dto';
import { commentSelection } from '../prisma/prismaSelect';
import { postInclude } from '../prisma/prismaSelect';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        userId,
        post: createPostDto.post,
      },
      include: postInclude,
    });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: postInclude,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    try {
      return await this.prisma.post.findUnique({
        where: { id },
        include: postInclude,
      });
    } catch (error) {
      console.error(error);

      if (error.code === 'P2023') {
        throw new NotFoundException('Post does not exist');
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
      select: commentSelection,
    });
  }
}
