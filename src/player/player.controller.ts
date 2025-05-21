import { Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { PlayerService } from './player.service';
import { AuthService } from '../auth/auth.service';
import { RegisterPlayerDto } from '../auth/dto/register-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Players')
@Controller('players')
export class PlayerController {
  constructor(private readonly PlayerService: PlayerService) {}


  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Player' })
  async getMe(@Req() req) {
    console.log(req.user);
    const player = await this.PlayerService.getPlayerById(req.user.id);
    console.log(player);
    return player;
  }
  
}
