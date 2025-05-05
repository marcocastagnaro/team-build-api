import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CoachRepository } from './coach.repository';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoachController],
  providers: [CoachService, CoachRepository, PrismaService],
  exports: [CoachService],
})
export class CoachModule {}
