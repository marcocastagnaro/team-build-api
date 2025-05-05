import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './enums/role.enum';
import { PlayerStatus, PlayerRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, role, playerRole } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma[role.toLowerCase()].findUnique({
      where: { mail: email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user based on role
    const user = await this.prisma[role.toLowerCase()].create({
      data: role === Role.PLAYER ? {
        name,
        mail: email,
        password: hashedPassword,
        status: PlayerStatus.ACTIVE,
        role: playerRole || PlayerRole.OTHER,
      } : {
        name,
        mail: email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = this.generateToken(user.id, email, role);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.mail,
        name: user.name,
        role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Try to find user in both coach and player tables
    const coach = await this.prisma.coach.findUnique({ where: { mail: email } });
    const player = await this.prisma.player.findUnique({ where: { mail: email } });
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
      user: {
        id: user.id,
        email: user.mail,
        name: user.name,
        role,
      },
    };
  }

  private generateToken(userId: number, email: string, role: Role) {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
    });
  }
} 