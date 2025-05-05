import { Module } from '@nestjs/common';
import { PlayerRepository } from 'src/player/player.repository';

import { PrismaService } from 'src/prisma.service';
import { CoachRepository } from './coach.repository';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CoachController],
  providers: [CoachService, CoachRepository, PrismaService],
  exports: [CoachService],
})
export class CoachModule {}
