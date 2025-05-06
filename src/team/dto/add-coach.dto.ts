import { IsNotEmpty, IsNumber } from "class-validator";

export class AddCoachDto {
  @IsNotEmpty()
  @IsNumber()
  teamId: number;
  coachId: number;
}
