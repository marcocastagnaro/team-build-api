import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from '@prisma/client';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; sport: string; coachId: number }): Promise<Team> {
    return this.prisma.team.create({
      data: {
        name: data.name,
        sport: data.sport,
        coachTeams: {
          create: {
            coach: {
              connect: { id: data.coachId }
            }
          }
        }
      },
    });
  }

  async findById(id: number): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        playerTeams: {
          include: {
            player: true
          }
        },
        coachTeams: {
          include: {
            coach: true
          }
        }
      }
    });
  }

  async addPlayer(teamId: number, playerId: number) {
    return this.prisma.player_team.create({
      data: {
        team: {
          connect: { id: teamId }
        },
        player: {
          connect: { id: playerId }
        }
      }
    });
  }
}
