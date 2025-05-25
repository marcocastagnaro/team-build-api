import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [TeamModule],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
  exports: [NewsService],
})
export class NewsModule {}
