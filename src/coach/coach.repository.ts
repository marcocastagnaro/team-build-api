import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CoachRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCoach() {
    return this.prisma.coach.findMany();
  }
  async findCoachById(id: string) {
    return this.prisma.coach.findUnique({ where: { id } });
  }

  async findCoachByEmail(email: string) {
    return this.prisma.coach.findUnique({ where: { mail: email } });
  }
}
