import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email field is empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'Invalid password format' })
  @IsNotEmpty({ message: 'Password field is empty' })
  @MinLength(8, { message: 'Password must be 8 characters or more' })
  @ApiProperty()
  password: string;
}
