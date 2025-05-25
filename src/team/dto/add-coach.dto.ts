import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCoachDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The id of the team' })
  teamId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The id of the coach' })
  coachId: string;
}
