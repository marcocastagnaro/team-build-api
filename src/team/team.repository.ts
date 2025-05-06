import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team, Prisma } from '@prisma/client';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; sport: string }, coachId: number) {
    // Create the team and associate the coach
    return this.prisma.team.create({
      data: {
        name: data.name,
        sport: data.sport,
        coaches: {
          create: {
            id_coach: coachId
          }
        }
      },
      include: {
        coaches: true
      }
    });
  }

  async findById(id: number): Promise<Team | null> {
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

  async addPlayer(teamId: number, playerId: number): Promise<void> {
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

    await this.prisma.player_team.create({
      data: {
        id_player: playerId,
        id_team: teamId,
      },
    });
  }

  async addCoach(teamId: number, coachId: number): Promise<void> {
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

  async getTeamsByCoachId(coachId: number): Promise<Team[]> {
    return this.prisma.team.findMany({
      where: {
        coaches: {
          some: {
            id_coach: coachId
          }
        }
      },
    });
  }
  async getTeamByPlayerId(playerId: number): Promise<Team | null> {
    return this.prisma.team.findFirst({
      where: {
        players: {
          some: {
            id_player: playerId
          }
        }
      }
    });
  }
}
