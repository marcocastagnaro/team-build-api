import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team, Prisma, PlayerStatus } from '@prisma/client';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; sport: string }, coachId: string) {
    // Create the team and associate the coach
    return this.prisma.team.create({
      data: {
        name: data.name,
        sport: data.sport,
        coaches: {
          create: {
            id_coach: coachId,
          },
        },
      },
      include: {
        coaches: true,
      },
    });
  }

  async findById(id: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        players: {
          include: {
            player: true,
          },
        },
        coaches: {
          include: {
            coach: true,
          },
        },
      } as Prisma.TeamInclude,
    });
  }

  async addPlayer(teamId: string, playerId: string): Promise<void> {
    try {
      const team = await this.prisma.team.findUnique({
        where: { id: teamId },
      });

      if (!team) {
        throw new Error('Team not found');
      }

      const player = await this.prisma.player.findUnique({
        where: { id: playerId },
      });

      if (!player) {
        throw new Error('Player not found');
      }

      // Check if player is already in a team
      const existingPlayerTeam = await this.prisma.player_team.findFirst({
        where: { id_player: playerId },
      });

      if (existingPlayerTeam) {
        throw new Error('Player is already in a team');
      }

      await this.prisma.player_team.create({
        data: {
          id_player: playerId,
          id_team: teamId,
          status: PlayerStatus.ACTIVE,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to add player to team: ${error.message}`);
    }
  }

  async addCoach(teamId: string, coachId: string): Promise<void> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new Error('Team not found');
    }

    await this.prisma.coach_team.create({
      data: {
        id_coach: coachId,
        id_team: teamId,
      },
    });
  }

  async getTeamsByCoachId(coachId: string): Promise<Team[]> {
    return this.prisma.team.findMany({
      where: {
        coaches: {
          some: {
            id_coach: coachId,
          },
        },
      },
    });
  }
  async getTeamByPlayerId(playerId: string): Promise<Team | null> {
    return this.prisma.team.findFirst({
      where: {
        players: {
          some: {
            id_player: playerId,
          },
        },
      },
    });
  }
  async updatePlayerStatus(
    playerId: string,
    teamId: string,
    status: string,
  ): Promise<void> {
    const playerStatus = status as PlayerStatus;

    // First verify that the player-team relationship exists
    const playerTeam = await this.prisma.player_team.findUnique({
      where: {
        id_player_id_team: {
          id_player: playerId,
          id_team: teamId,
        },
      },
    });

    if (!playerTeam) {
      throw new Error('Player is not associated with this team');
    }

    // Update the status in the Player_team table
    await this.prisma.player_team.update({
      where: {
        id_player_id_team: {
          id_player: playerId,
          id_team: teamId,
        },
      },
      data: {
        status: playerStatus,
      },
    });
  }
}
