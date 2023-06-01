import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan' })
  @IsString({ message: 'Invalid first name' })
  @IsNotEmpty({ message: 'First name is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Special characters or numbers in first name are not allowed',
  })
  firstName: string;

  @ApiProperty({ example: 'Dela Cruz' })
  @IsString({ message: 'Invalid last name' })
  @IsNotEmpty({ message: 'Last name is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Special characters or numbers in last name are not allowed',
  })
  lastName: string;

  @ApiProperty({ example: 'juandelacruz@gmail.com' })
  @IsString({ message: 'Invalid email format' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'Strong-p@ssword123' })
  @IsString({ message: 'Invalid password format' })
  @MinLength(8, { message: 'Minimum of 8 characters for password is required' })
  @MaxLength(20, {
    message: 'Password is limited to 20 characters only',
  })
  password: string;

  @ApiProperty({
    example: 'Strong-p@ssword123',
    description: 'Same with password field',
  })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString({ message: 'Invalid confirm password format' })
  confirmPassword: string;
}
