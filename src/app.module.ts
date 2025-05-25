import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { CoachModule } from './coach/coach.module';
import { PlayerModule } from './player/player.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    TeamModule,
    CoachModule,
    PlayerModule,
  ],
})
export class AppModule {}
