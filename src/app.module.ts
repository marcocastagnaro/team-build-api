import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { PrismaService } from './prisma.service';
import { TeamModule } from './team/team.module';
import { CoachModule } from './coach/coach.module';

@Module({
  imports: [PlayerModule, CoachModule, TeamModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
