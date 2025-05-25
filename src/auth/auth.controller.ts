import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { RegisterCoachDto } from './dto/register-coach.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/player')
  @ApiOperation({ summary: 'Register Player' })
  async registerPlayer(@Body() registerPlayerDto: RegisterPlayerDto) {
    return this.authService.register(registerPlayerDto);
  }

  @Post('register/coach')
  @ApiOperation({ summary: 'Register Coach' })
  async registerCoach(@Body() registerCoachDto: RegisterCoachDto) {
    return this.authService.register(registerCoachDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
