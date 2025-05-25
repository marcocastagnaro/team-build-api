import { Module } from '@nestjs/common';
import { CoachRepository } from './coach.repository';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoachController],
  providers: [CoachService, CoachRepository, PrismaService],
  exports: [CoachService],
})
export class CoachModule {}
