import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Invalid email format' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Email field is empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'Invalid password format' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Password field is empty' })
  @ApiProperty()
  password: string;
}
