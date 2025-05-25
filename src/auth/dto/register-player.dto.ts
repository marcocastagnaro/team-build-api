import { IsEnum } from 'class-validator';
import { RegisterDto } from './register.dto';
import { Role } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterPlayerDto extends RegisterDto {
  @IsEnum(Role)
  @ApiProperty({ description: 'The role of the user' })
  role: Role = Role.PLAYER;
}
