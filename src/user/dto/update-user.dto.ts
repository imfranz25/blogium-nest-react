import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  profilePicture?: string;

  @ApiProperty({ example: 'Musician' })
  @Transform(({ value }) => {
    if (value) {
      return value.trim();
    }

    return '';
  })
  bio?: string;
}
