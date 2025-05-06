import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { CoachGuard } from 'src/auth/guards/coach.guard';
import { AddCoachDto } from './dto/add-coach.dto';

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

  @Post('add-player')
  @UseGuards(CoachGuard)
  async addPlayerToTeam(@Body() addPlayerDto: AddPlayerDto) {
    return this.teamService.addPlayerToTeam(addPlayerDto.teamId, addPlayerDto.playerId);
  }

  @Post('add-coach')
  @UseGuards(CoachGuard)
  async addCoachToTeam(@Body() addCoachDto: AddCoachDto) {
    return this.teamService.addCoach(addCoachDto.teamId, addCoachDto.coachId);
  }

  @Get('coach/:id')
  @UseGuards(CoachGuard)
  async getTeamsByCoachId(@Param('id') id: string) {
    return this.teamService.getTeamsByCoachId(parseInt(id));
  }

  //get team by player id
  @Get('player/:id')
  async getTeamByPlayerId(@Param('id') id: string) {
    return this.teamService.getTeamByPlayerId(parseInt(id));
  }
  
}
