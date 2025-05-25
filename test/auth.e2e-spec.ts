import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    // Set up test environment variables
    process.env.JWT_SECRET = 'h/dtYRKfrVOYrVTKdTwdGMaOdyhK/TUwFOxd8TBwBQA=';
    process.env.JWT_EXPIRATION = '1h';
    process.env.DATABASE_URL =
      'postgresql://postgres:postgres@localhost:5432/team_build_test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.player_team.deleteMany();
    await prisma.coach_team.deleteMany();
    await prisma.player.deleteMany();
    await prisma.coach.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('Register', () => {
    const coachData = {
      name: 'Test Coach',
      email: 'coach@test.com',
      password: 'password123',
    };

    const playerData = {
      name: 'Test Player',
      email: 'player@test.com',
      password: 'password123',
      playerRole: 'OTHER',
    };

    it('should register a new coach', () => {
      return request(app.getHttpServer())
        .post('/auth/register/coach')
        .send(coachData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
        });
    });

    it('should register a new player', () => {
      return request(app.getHttpServer())
        .post('/auth/register/player')
        .send(playerData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
        });
    });

    it('should not register with existing email', async () => {
      // First registration
      await request(app.getHttpServer())
        .post('/auth/register/coach')
        .send(coachData)
        .expect(201);

      // Second registration with same email
      return request(app.getHttpServer())
        .post('/auth/register/coach')
        .send(coachData)
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('Email already exists');
        });
    });
  });

  describe('Login', () => {
    const loginData = {
      email: 'coach@test.com',
      password: 'password123',
    };

    it('should login successfully', async () => {
      // Register the user first
      await request(app.getHttpServer())
        .post('/auth/register/coach')
        .send({
          name: 'Test Coach',
          email: 'coach@test.com',
          password: 'password123',
        })
        .expect(201);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
        });
    });

    it('should not login with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'coach@test.com',
          password: 'wrongpassword',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('Invalid credentials');
        });
    });
  });
});
