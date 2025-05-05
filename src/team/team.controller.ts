import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { CoachGuard } from 'src/auth/guards/coach.guard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(CoachGuard)
  async createTeam(@Body() createTeamDto: CreateTeamDto, @User() user: any) {
    return this.teamService.createTeam(createTeamDto, user.id);
  }

  @Get(':id')
  async getTeam(@Param('id') id: string) {
    return this.teamService.getTeamById(parseInt(id));
  }

  @Post(':id/players/:playerId')
  @UseGuards(CoachGuard)
  async addPlayerToTeam(
    @Param('id') teamId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.teamService.addPlayerToTeam(parseInt(teamId), parseInt(playerId));
  }
}
