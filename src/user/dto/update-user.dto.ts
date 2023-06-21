import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  profilePicture?: any;

  @ApiProperty({ example: 'Musician' })
  @IsString({ message: 'Invalid biography format' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Old password is required' })
  bio?: string;
}
