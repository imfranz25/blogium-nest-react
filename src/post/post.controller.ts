import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentPostDto } from './dto/comment-post.dto';

@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}
  @Post()
  create(@Req() request: any, @Body() createPostDto: CreatePostDto) {
    const userId = request?.user?.id;

    return this.postService.create(userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cachedPost: any = await this.cacheManager.get(`post:${id}`);

    if (cachedPost) {
      return cachedPost;
    }

    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.cacheManager.set(`post:${id}`, post);

    return post;
  }

  @Patch(':id')
  update(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = request?.user?.id;
    const updatedPost = this.postService.update(id, userId, updatePostDto);

    if (!updatedPost) {
      throw new NotFoundException(
        'Post does not exist thus no update occurred',
      );
    }

    return updatedPost;
  }

  @Delete(':id')
  async remove(@Req() request: any, @Param('id') id: string) {
    const userId = request?.user?.id;

    const [_deletedCached, deletedPost] = await Promise.all([
      this.cacheManager.del(`post:${id}`),
      this.postService.remove(id, userId),
    ]);

    return deletedPost;
  }

  @Post('like/:id')
  async likePost(@Req() request: any, @Param('id') id: string) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userId = request?.user?.id;
    const userLike = await this.postService.like(post.id, userId);

    /* Updated Redis Cache */
    post.Like.push(userLike);
    await this.cacheManager.set(`post:${post.id}`, post);

    return userLike;
  }

  @Delete('like/:id')
  async unlikePost(@Req() request: any, @Param('id') id: string) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userId = request?.user?.id;
    const userUnliked = await this.postService.unlike(post.id, userId);

    /* Updated Redis Cache */
    post.Like = post.Like.filter((userLike) => userLike.userId !== userId);
    await this.cacheManager.set(`post:${post.id}`, post);

    return userUnliked;
  }

  @Post('comment')
  async createComment(
    @Req() request: any,
    @Body() commentPostDto: CommentPostDto,
  ) {
    const post = await this.findOne(commentPostDto.postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userId = request?.user?.id;
    const userComment = await this.postService.addComment(
      userId,
      commentPostDto,
    );

    const { userId: _userId, ...updatedComment } = userComment;

    /* Updated Redis Cache */
    post.Comment.push(updatedComment);
    await this.cacheManager.set(`post:${post.id}`, post);

    return userComment;
  }

  @Delete('comment/:id')
  async deleteComment(
    @Req() request: any,
    @Param('id') id: string,
    @Body() { postId }: { postId: string },
  ) {
    const post = await this.findOne(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userId = request?.user?.id;
    const deletedComment = await this.postService.deleteComment(userId, id);

    /* Updated Redis Cache */
    post.Comment = post.Comment.filter((comment) => comment.id !== id);
    await this.cacheManager.set(`post:${postId}`, post);

    return deletedComment;
  }
}
