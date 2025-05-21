import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { CoachGuard } from 'src/auth/guards/coach.guard';
import { AddCoachDto } from './dto/add-coach.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Create Team' })
  async createTeam(@Body() createTeamDto: CreateTeamDto, @User() user: any) {
    return this.teamService.createTeam(createTeamDto, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Team' })
  async getTeam(@Param('id') id: string) {
    return this.teamService.getTeamById(parseInt(id));
  }

  @Post('add-player')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Add Player to Team' })
  async addPlayerToTeam(@Body() addPlayerDto: AddPlayerDto) {
    return this.teamService.addPlayerToTeam(addPlayerDto.teamId, addPlayerDto.playerId);
  }

  @Post('add-coach')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Add Coach to Team' })
  async addCoachToTeam(@Body() addCoachDto: AddCoachDto) {
    return this.teamService.addCoach(addCoachDto.teamId, addCoachDto.coachId);
  }

  @Get('coach/:id')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Get Teams by Coach Id' })
  async getTeamsByCoachId(@Param('id') id: string) {
    return this.teamService.getTeamsByCoachId(parseInt(id));
  }

  //get team by player id
  @Get('player/:id')
  @ApiOperation({ summary: 'Get Team by Player Id' })
  async getTeamByPlayerId(@Param('id') id: string) {
    return this.teamService.getTeamByPlayerId(parseInt(id));
  }
  
}
