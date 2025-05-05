import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    return this.playerRepository.create(createPlayerDto);
  }

  async getPlayer() {
    return this.playerRepository.findAll();
  }

  async getPlayerById(id: number) {
    return this.playerRepository.findById(id);
  }
}
