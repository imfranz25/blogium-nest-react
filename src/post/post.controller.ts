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
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = request?.user?.id;
    return this.postService.update(id, userId, updatePostDto);
  }

  @Delete(':id')
  remove(@Req() request: any, @Param('id') id: string) {
    const userId = request?.user?.id;

    return this.postService.remove(id, userId);
  }

  @Post('like/:id')
  async likePost(@Req() request: any, @Param('id') id: string) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userId = request?.user?.id;

    return this.postService.like(post.id, userId);
  }

  @Delete('like/:id')
  async unlikePost(@Req() request: any, @Param('id') id: string) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userId = request?.user?.id;

    return this.postService.unlike(post.id, userId);
  }
}
