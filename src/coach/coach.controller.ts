import { Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { AuthService } from '../auth/auth.service';
import { RegisterCoachDto } from '../auth/dto/register-coach.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Coaches')
@Controller('coaches')
export class CoachController {
  constructor(private readonly CoachService: CoachService) {}

  @Post()
  @ApiOperation({ summary: 'Create Coach' })
  async createUser(@Body() dto: CreateCoachDto) {
    console.log('Received createUser request with data:', dto);
    return this.CoachService.createCoach(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Coach' })
  async getMe(@Req() req) {
    return req.user;
  }
}
