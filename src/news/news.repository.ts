import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { News } from '@prisma/client';

@Injectable()
export class NewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    content: string;
    teamId: string;
    createdBy: string;
    isPublished?: boolean;
  }): Promise<News> {
    return this.prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        teamId: data.teamId,
        createdBy: data.createdBy,
        isPublished: data.isPublished ?? true,
      },
      include: {
        team: true,
        author: true,
      },
    });
  }

  async findById(id: string): Promise<News | null> {
    return this.prisma.news.findUnique({
      where: { id },
      include: {
        team: true,
        author: true,
      },
    });
  }

  async findByTeamId(teamId: string): Promise<News[]> {
    return this.prisma.news.findMany({
      where: { teamId },
      include: {
        team: true,
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
      isPublished?: boolean;
    },
  ): Promise<News> {
    return this.prisma.news.update({
      where: { id },
      data,
      include: {
        team: true,
        author: true,
      },
    });
  }

  async delete(id: string): Promise<News> {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
