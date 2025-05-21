import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the team' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The sport of the team' })
  sport: string;
}
