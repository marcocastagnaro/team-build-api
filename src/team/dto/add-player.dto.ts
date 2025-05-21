import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddPlayerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the team' })
  teamId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the player' })
  playerId: number;
} 