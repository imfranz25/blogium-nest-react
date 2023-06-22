import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentPostDto {
  @IsString({ message: 'Invalid comment, please try again' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Comment is required' })
  @ApiProperty()
  comment: string;

  @ApiProperty()
  postId: string;
}
