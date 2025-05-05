import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';
import { PlayerRole } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsEnum(PlayerRole)
  playerRole?: PlayerRole;
} 