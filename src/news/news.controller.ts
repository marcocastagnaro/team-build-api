import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CoachGuard } from '../auth/guards/coach.guard';
import { User } from '../auth/decorators/user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User as UserInterface } from '../auth/interfaces/user.interface';

@ApiTags('News')
@ApiBearerAuth()
@Controller('news')
@UseGuards(JwtAuthGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Create News' })
  async createNews(
    @Body() createNewsDto: CreateNewsDto,
    @User() user: UserInterface,
  ) {
    return this.newsService.createNews(createNewsDto, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get News by ID' })
  async getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'Get News by Team ID' })
  async getNewsByTeamId(@Param('teamId') teamId: string) {
    return this.newsService.getNewsByTeamId(teamId);
  }

  @Put(':id')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Update News' })
  async updateNews(
    @Param('id') id: string,
    @Body()
    updateData: {
      title?: string;
      content?: string;
      isPublished?: boolean;
    },
    @User() user: UserInterface,
  ) {
    return this.newsService.updateNews(id, updateData, user.id);
  }

  @Delete(':id')
  @UseGuards(CoachGuard)
  @ApiOperation({ summary: 'Delete News' })
  async deleteNews(@Param('id') id: string, @User() user: UserInterface) {
    return this.newsService.deleteNews(id, user.id);
  }
}
