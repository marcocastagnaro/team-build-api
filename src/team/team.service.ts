import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { CoachService } from '../coach/coach.service';
import {
  ResourceNotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ValidationException,
} from '../exceptions/custom.exceptions';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly coachService: CoachService,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, coachId: string) {
    try {
      // Verify if the coach exists
      const coach = await this.coachService.findCoachById(coachId);
      if (!coach) {
        throw new ResourceNotFoundException('Coach');
      }

      return this.teamRepository.create(
        {
          name: createTeamDto.name,
          sport: createTeamDto.sport,
        },
        coachId,
      );
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to create team: ${error.message}`);
    }
  }

  async getTeamById(id: string) {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new ResourceNotFoundException('Team');
    }
    return team;
  }

  async addPlayerToTeam(teamId: string, playerId: string) {
    try {
      // Verify if the team exists
      const team = await this.teamRepository.findById(teamId);
      if (!team) {
        throw new ResourceNotFoundException('Team');
      }

      // Check if player is already in the team
      const existingPlayerTeam =
        await this.teamRepository.getTeamByPlayerId(playerId);
      if (existingPlayerTeam) {
        throw new ValidationException('Player is already in a team');
      }

      return this.teamRepository.addPlayer(teamId, playerId);
    } catch (error) {
      if (
        error instanceof ResourceNotFoundException ||
        error instanceof ValidationException
      ) {
        throw error;
      }
      throw new Error(`Failed to add player to team: ${error.message}`);
    }
  }

  async addCoach(teamId: string, coachId: string) {
    // Verify if the team exists
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new ResourceNotFoundException('Team');
    }

    // Verify if the coach exists
    const coach = await this.coachService.findCoachById(coachId);
    if (!coach) {
      throw new ResourceNotFoundException('Coach');
    }

    return this.teamRepository.addCoach(teamId, coachId);
  }

  async getTeamsByCoachId(coachId: string) {
    // Verify if the coach exists
    const coach = await this.coachService.findCoachById(coachId);
    if (!coach) {
      throw new ResourceNotFoundException('Coach');
    }

    return this.teamRepository.getTeamsByCoachId(coachId);
  }

  async getTeamByPlayerId(playerId: string) {
    const team = await this.teamRepository.getTeamByPlayerId(playerId);
    if (!team) {
      throw new ResourceNotFoundException('Team for player');
    }
    return team;
  }

  async updatePlayerStatus(playerId: string, teamId: string, status: string) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new ResourceNotFoundException('Team');
    }
    const playerTeam = await this.teamRepository.getTeamByPlayerId(playerId);
    if (!playerTeam) {
      throw new ResourceNotFoundException('Player or team association');
    }
    if (playerTeam.id !== teamId) {
      throw new ValidationException(
        'Player does not belong to the specified team',
      );
    }
    const validStatuses = [
      'ACTIVE',
      'SUSPENDED',
      'INJURED',
      'INACTIVE',
      'OTHER',
    ];
    if (!validStatuses.includes(status)) {
      throw new ValidationException(
        `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      );
    }

    return this.teamRepository.updatePlayerStatus(playerId, teamId, status);
  }
}
