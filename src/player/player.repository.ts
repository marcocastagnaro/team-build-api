import { Injectable } from '@nestjs/common';
import { Player, PlayerStatus, PlayerRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePlayerDto): Promise<Player> {
    return this.prisma.player.create({
      data: {
        name: data.name,
        mail: data.mail,
        password: data.password,
        status: data.status || PlayerStatus.ACTIVE,
        role: data.role || PlayerRole.OTHER,
      },
    });
  }

  async findById(id: number): Promise<Player | null> {
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
