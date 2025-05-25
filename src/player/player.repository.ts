import { Injectable } from '@nestjs/common';
import { Player, PlayerStatus, PlayerRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Player | null> {
    return this.prisma.player.findUnique({
      where: { id },
    });
  }

  async findByEmail(mail: string): Promise<Player | null> {
    return this.prisma.player.findUnique({
      where: { mail },
    });
  }

  async findAll(): Promise<Player[]> {
    return this.prisma.player.findMany();
  }
}
