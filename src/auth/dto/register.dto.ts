import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { PlayerRole, PlayerStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the user' })
  role: Role;

  @IsEnum(PlayerRole)
  @IsOptional()
  @ApiProperty({ description: 'The role of the player' })
  playerRole?: PlayerRole;

  @IsEnum(PlayerStatus)
  @IsOptional()
  @ApiProperty({ description: 'The status of the player' })
  status?: PlayerStatus;
}
