import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCoachDto } from './dto/create-coach.dto';
@Injectable()
export class CoachRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCoach(data: CreateCoachDto) {
    const payload = {
      ...data,

    }
    return this.prisma.coach.create({ data: payload });
  }

  async getCoach() {
    return this.prisma.coach.findMany();
  }
  async findCoachById(id: number) {
    return this.prisma.coach.findUnique({ where: { id } });
  }

  async findCoachByEmail(email: string) {
    return this.prisma.coach.findUnique({ where: { mail: email } });
  }
}
