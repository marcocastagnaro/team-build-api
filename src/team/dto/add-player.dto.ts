import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlayerStatus } from '@prisma/client';

export class AddPlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the team' })
  teamId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the player' })
  playerId: string;

  @IsNotEmpty()
  playerStatus: PlayerStatus;
}
