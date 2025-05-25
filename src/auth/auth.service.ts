import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from './enums/role.enum';
import { PlayerRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, role, playerRole } = registerDto;

    // Check if user exists in either table
    const existingCoach = await this.prisma.coach.findUnique({
      where: { mail: email },
    });
    const existingPlayer = await this.prisma.player.findUnique({
      where: { mail: email },
    });

    if (existingCoach || existingPlayer) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === Role.PLAYER) {
      const player = await this.prisma.player.create({
        data: {
          name,
          mail: email,
          password: hashedPassword,
          role: playerRole || PlayerRole.OTHER,
        },
      });
      return {
        access_token: this.generateToken(player.id, email, Role.PLAYER),
        id: player.id,
      };
    } else {
      const coach = await this.prisma.coach.create({
        data: {
          name,
          mail: email,
          password: hashedPassword,
        },
      });
      return {
        access_token: this.generateToken(coach.id, email, Role.COACH),
        id: coach.id,
      };
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Try to find user in both coach and player tables
    const coach = await this.prisma.coach.findUnique({
      where: { mail: email },
    });
    const player = await this.prisma.player.findUnique({
      where: { mail: email },
    });
    const user = coach || player;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Determine role
    const role = coach ? Role.COACH : Role.PLAYER;

    // Generate JWT token
    const token = this.generateToken(user.id, email, role);

    return {
      access_token: token,
      id: user.id,
    };
  }

  private generateToken(userId: string, email: string, role: Role) {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
    });
  }
}
