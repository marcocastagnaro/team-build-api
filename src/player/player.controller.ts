import { Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { AuthService } from '../auth/auth.service';
import { RegisterPlayerDto } from '../auth/dto/register-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('players')
export class PlayerController {
  constructor(private readonly PlayerService: PlayerService, private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerPlayerDto: RegisterPlayerDto) {
    return this.authService.register(registerPlayerDto);
  }

  @Post()
  async createUser(@Body() dto: CreatePlayerDto) {
    console.log('Received createUser request with data:', dto);
    return this.PlayerService.createPlayer(dto);
  }

  @Get()
  async getPlayer() {
    return this.PlayerService.getPlayer();
  }
}
