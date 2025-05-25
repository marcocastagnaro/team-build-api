import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { CreateNewsDto } from './dto/create-news.dto';
import {
  ResourceNotFoundException,
  ForbiddenException,
} from '../exceptions/custom.exceptions';
import { TeamService } from '../team/team.service';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly teamService: TeamService,
  ) {}

  async createNews(createNewsDto: CreateNewsDto, coachId: string) {
    // Verify if the team exists
    const team = await this.teamService.getTeamById(createNewsDto.teamId);
    if (!team) {
      throw new ResourceNotFoundException('Team');
    }

    // Verify if the coach is associated with the team
    const isCoachOfTeam = team.coaches.some(
      (coach) => coach.id_coach === coachId,
    );
    if (!isCoachOfTeam) {
      throw new ForbiddenException(
        'You are not authorized to create news for this team',
      );
    }

    return this.newsRepository.create({
      ...createNewsDto,
      createdBy: coachId,
    });
  }

  async getNewsById(id: string) {
    const news = await this.newsRepository.findById(id);
    if (!news) {
      throw new ResourceNotFoundException('News');
    }
    return news;
  }

  async getNewsByTeamId(teamId: string) {
    // Verify if the team exists
    const team = await this.teamService.getTeamById(teamId);
    if (!team) {
      throw new ResourceNotFoundException('Team');
    }

    return this.newsRepository.findByTeamId(teamId);
  }

  async updateNews(
    id: string,
    data: {
      title?: string;
      content?: string;
      isPublished?: boolean;
    },
    coachId: string,
  ) {
    const news = await this.newsRepository.findById(id);
    if (!news) {
      throw new ResourceNotFoundException('News');
    }

    // Verify if the coach is the author of the news
    if (news.createdBy !== coachId) {
      throw new ForbiddenException(
        'You are not authorized to update this news',
      );
    }

    return this.newsRepository.update(id, data);
  }

  async deleteNews(id: string, coachId: string) {
    const news = await this.newsRepository.findById(id);
    if (!news) {
      throw new ResourceNotFoundException('News');
    }

    // Verify if the coach is the author of the news
    if (news.createdBy !== coachId) {
      throw new ForbiddenException(
        'You are not authorized to delete this news',
      );
    }

    return this.newsRepository.delete(id);
  }
}
