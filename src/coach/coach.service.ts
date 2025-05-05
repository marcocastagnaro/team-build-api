import { Injectable, BadRequestException } from '@nestjs/common';
import { CoachRepository } from './coach.repository';
import { CreateCoachDto } from './dto/create-coach.dto';

@Injectable()
export class CoachService {
  constructor(private readonly coachRepository: CoachRepository) {}

  async createCoach(dto: CreateCoachDto) {
    console.log('Creating user with data:', dto);
    try {
      // Create Coach
      if (await this.coachRepository.findCoachByEmail(dto.mail)) {
        throw new BadRequestException('Coach already exists');
      }
      const coach = await this.coachRepository.createCoach(dto);
      console.log('Coach created:', coach);
      return coach;
      
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Error creating user');
    }
  }  

  async getCoach() {
    return this.coachRepository.getCoach();
  }

  async findCoachById(id: number) {
    return this.coachRepository.findCoachById(id);
  }

}
