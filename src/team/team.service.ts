import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { CoachService } from '../coach/coach.service';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly coachService: CoachService,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, coachId: number) {
    // Verify if the coach exists
    const coach = await this.coachService.findCoachById(coachId);
    if (!coach) {
      throw new UnauthorizedException('Coach not found');
    }

    return this.teamRepository.create({
      name: createTeamDto.name,
      sport: createTeamDto.sport,
      coach: coachId,
    });
  }

  async getTeamById(id: number) {
    return this.teamRepository.findById(id);
  }

  async addPlayerToTeam(teamId: number, playerId: number) {
    return this.teamRepository.addPlayer(teamId, playerId);
  }
}
