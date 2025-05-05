import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { RegisterCoachDto } from './dto/register-coach.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/player')
  async registerPlayer(@Body() registerPlayerDto: RegisterPlayerDto) {
    return this.authService.register(registerPlayerDto);
  }

  @Post('register/coach')
  async registerCoach(@Body() registerCoachDto: RegisterCoachDto) {
    return this.authService.register(registerCoachDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
} 