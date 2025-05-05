import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CoachModule } from '../coach/coach.module';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [PrismaModule, CoachModule, PlayerModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TeamService],
})
export class TeamModule {}
