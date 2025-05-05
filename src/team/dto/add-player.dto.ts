import { IsNumber, IsNotEmpty } from 'class-validator';

export class AddPlayerDto {
  @IsNumber()
  @IsNotEmpty()
  teamId: number;

  @IsNumber()
  @IsNotEmpty()
  playerId: number;
} 