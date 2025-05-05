import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlayerStatus, PlayerRole } from '@prisma/client';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(PlayerStatus)
  status?: PlayerStatus;

  @IsOptional()
  @IsEnum(PlayerRole)
  role?: PlayerRole;
}


