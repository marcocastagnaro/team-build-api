import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { CoachGuard } from '../auth/guards/coach.guard';
import { AddCoachDto } from './dto/add-coach.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Teams')
@ApiBearerAuth()
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
  async getTeam(@Param('id') id: string, @User() user: any) {
    return this.teamService.getTeamById(id);
  }

  @Post('add-player')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Add Player to Team' })
  async addPlayerToTeam(@Body() addPlayerDto: AddPlayerDto, @User() user: any) {
    // Verify that the user is a coach of the team
    return this.teamService.addPlayerToTeam(
      addPlayerDto.teamId,
      addPlayerDto.playerId,
    );
  }

  @Post('add-coach')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Add Coach to Team' })
  async addCoachToTeam(@Body() addCoachDto: AddCoachDto, @User() user: any) {
    // Verify that the user is a coach of the team
    return this.teamService.addCoach(addCoachDto.teamId, addCoachDto.coachId);
  }

  @Get('coach/me')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Get Teams by Coach Id' })
  async getTeamsByCoachId(@User() user: any) {
    return this.teamService.getTeamsByCoachId(user.id);
  }

  @Get('player/me')
  @ApiOperation({ summary: 'Get Team by Player Id' })
  async getTeamByPlayerId(@User() user: any) {
    return this.teamService.getTeamByPlayerId(user.id);
  }

  @Put('status-player/:teamId/:playerId/:status')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Update Player Status' })
  async updatePlayerStatus(
    @Param('teamId') teamId: string,
    @Param('playerId') playerId: string,
    @Param('status') status: string,
    @User() user: any,
  ) {
    return await this.teamService.updatePlayerStatus(playerId, teamId, status);
  }
}
