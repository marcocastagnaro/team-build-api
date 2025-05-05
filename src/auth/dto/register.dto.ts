import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';
import { PlayerRole, PlayerStatus } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsEnum(PlayerRole)
  @IsOptional()
  playerRole?: PlayerRole;

  @IsEnum(PlayerStatus)
  @IsOptional()
  status?: PlayerStatus;
} 