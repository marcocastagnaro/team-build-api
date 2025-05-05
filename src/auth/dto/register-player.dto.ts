import { IsEnum } from 'class-validator';
import { RegisterDto } from './register.dto';
import { Role } from '../enums/role.enum';

export class RegisterPlayerDto extends RegisterDto {
  @IsEnum(Role)
  role: Role = Role.PLAYER;
} 