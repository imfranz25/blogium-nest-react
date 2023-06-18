import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email field is empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'Invalid password format' })
  @IsNotEmpty({ message: 'Password field is empty' })
  @ApiProperty()
  password: string;
}
