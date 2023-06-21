import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Invalid post, please try again' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Post is required' })
  @MinLength(5, { message: 'Minimum of 5 characters for post is required' })
  @ApiProperty()
  post: string;
}
