import { Injectable, BadRequestException } from '@nestjs/common';
import { CoachRepository } from './coach.repository';

@Injectable()
export class CoachService {
  constructor(private readonly coachRepository: CoachRepository) {}

  async getCoach() {
    return this.coachRepository.getCoach();
  }

  async findCoachById(id: string) {
    return this.coachRepository.findCoachById(id);
  }
}
