import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async getPlayer() {
    return this.playerRepository.findAll();
  }

  async getPlayerById(id: string) {
    return this.playerRepository.findById(id);
  }
}
