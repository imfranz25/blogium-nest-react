import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto {
  @ApiProperty({ example: 'Strong-p@ssword123' })
  @IsString({ message: 'Invalid password format' })
  @MinLength(8, { message: 'Minimum of 8 characters for password is required' })
  @MaxLength(20, {
    message: 'Password is limited to 20 characters only',
  })
  newPassword: string;

  @ApiProperty({
    example: 'Strong-p@ssword123',
    description: 'Same with password field',
  })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString({ message: 'Invalid confirm password format' })
  confirmNewPassword: string;

  @ApiProperty({
    example: 'MyOldP@ssword123',
    description: 'Same with password field',
  })
  @IsNotEmpty({ message: 'Old password is required' })
  @IsString({ message: 'Invalid old password format' })
  oldPassword: string;
}
