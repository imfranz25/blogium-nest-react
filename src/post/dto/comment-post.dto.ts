import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentPostDto {
  @IsString({ message: 'Invalid comment, please try again' })
  @IsNotEmpty({ message: 'Comment is required' })
  @ApiProperty()
  comment: string;
}
