import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddCoachDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The id of the team' })
  teamId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The id of the coach' })
  coachId: number;
}
