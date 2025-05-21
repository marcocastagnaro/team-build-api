import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
} 