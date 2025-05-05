import { Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { AuthService } from '../auth/auth.service';
import { RegisterCoachDto } from '../auth/dto/register-coach.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('coaches')
export class CoachController {
  constructor(private readonly CoachService: CoachService, private readonly authService: AuthService) {}

  @Post()
  async createUser(@Body() dto: CreateCoachDto) {
    console.log('Received createUser request with data:', dto);
    return this.CoachService.createCoach(dto);
  }

  @Get()
  async getCoach() {
    return this.CoachService.getCoach();
  }

  @Post('register')
  async register(@Body() registerCoachDto: RegisterCoachDto) {
    return this.authService.register(registerCoachDto);
  }
}
