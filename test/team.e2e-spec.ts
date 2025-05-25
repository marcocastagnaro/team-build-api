import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Role } from '../src/auth/enums/role.enum';
import { PlayerStatus } from '@prisma/client';

describe('TeamController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let coachToken: string;
  let playerToken: string;
  let coachId: string;
  let playerId: string;
  let teamId: string;

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
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.player_team.deleteMany();
    await prisma.coach_team.deleteMany();
    await prisma.team.deleteMany();
    await prisma.player.deleteMany();
    await prisma.coach.deleteMany();

    // Create a coach for testing
    const coachData = {
      name: 'Test Coach',
      email: 'coach@test.com',
      password: 'password123',
      role: Role.COACH,
    };

    const coachResponse = await request(app.getHttpServer())
      .post('/auth/register/coach')
      .send(coachData);

    coachToken = coachResponse.body.access_token;
    coachId = coachResponse.body.id;

    // Create a player for testing
    const playerData = {
      name: 'Test Player',
      email: 'player@test.com',
      password: 'password123',
      role: Role.PLAYER,
    };

    const playerResponse = await request(app.getHttpServer())
      .post('/auth/register/player')
      .send(playerData);

    playerToken = playerResponse.body.access_token;
    playerId = playerResponse.body.id;

    // Create a team for testing
    const teamData = {
      name: 'Test Team',
      sport: 'Football',
    };

    const teamResponse = await request(app.getHttpServer())
      .post('/teams')
      .set('Authorization', `Bearer ${coachToken}`)
      .send(teamData);

    teamId = teamResponse.body.id;

    // Add player to team for tests that require it
    await request(app.getHttpServer())
      .post('/teams/add-player')
      .set('Authorization', `Bearer ${coachToken}`)
      .send({ teamId, playerId });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.player_team.deleteMany();
    await prisma.coach_team.deleteMany();
    await prisma.team.deleteMany();
    await prisma.player.deleteMany();
    await prisma.coach.deleteMany();
    await app.close();
  });

  describe('POST /teams', () => {
    it('should create a new team (as coach)', () => {
      const teamData = {
        name: 'Test Team 2',
        sport: 'Basketball',
      };

      return request(app.getHttpServer())
        .post('/teams')
        .set('Authorization', `Bearer ${coachToken}`)
        .send(teamData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(teamData.name);
          expect(res.body.sport).toBe(teamData.sport);
        });
    });

    it('should not create a team without coach role', () => {
      const teamData = {
        name: 'Test Team 3',
        sport: 'Basketball',
      };

      return request(app.getHttpServer())
        .post('/teams')
        .set('Authorization', `Bearer ${playerToken}`)
        .send(teamData)
        .expect(403);
    });
  });

  describe('GET /teams/:id', () => {
    it('should get team by id', () => {
      return request(app.getHttpServer())
        .get(`/teams/${teamId}`)
        .set('Authorization', `Bearer ${coachToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', teamId);
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('sport');
        });
    });

    it('should return 404 for non-existent team', () => {
      return request(app.getHttpServer())
        .get('/teams/non-existent-id')
        .set('Authorization', `Bearer ${coachToken}`)
        .expect(404);
    });
  });

  describe('POST /teams/add-player', () => {
    it('should add player to team (as coach)', () => {
      const addPlayerData = {
        teamId,
        playerId,
      };

      return request(app.getHttpServer())
        .post('/teams/add-player')
        .set('Authorization', `Bearer ${coachToken}`)
        .send(addPlayerData)
        .expect(201);
    });

    it('should not add player without coach role', () => {
      const addPlayerData = {
        teamId,
        playerId,
      };

      return request(app.getHttpServer())
        .post('/teams/add-player')
        .set('Authorization', `Bearer ${playerToken}`)
        .send(addPlayerData)
        .expect(403);
    });
  });

  describe('GET /teams/coach/me', () => {
    it('should get teams by coach id', () => {
      return request(app.getHttpServer())
        .get('/teams/coach/me')
        .set('Authorization', `Bearer ${coachToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id', teamId);
        });
    });

    it('should not get teams without coach role', () => {
      return request(app.getHttpServer())
        .get('/teams/coach/me')
        .set('Authorization', `Bearer ${playerToken}`)
        .expect(403);
    });
  });

  describe('GET /teams/player/me', () => {
    it('should get team by player id', () => {
      return request(app.getHttpServer())
        .get('/teams/player/me')
        .set('Authorization', `Bearer ${playerToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', teamId);
        });
    });
  });

  describe('PUT /teams/status-player/:teamId/:playerId/:status', () => {
    it('should update player status (as coach)', () => {
      return request(app.getHttpServer())
        .put(`/teams/status-player/${teamId}/${playerId}/SUSPENDED`)
        .set('Authorization', `Bearer ${coachToken}`)
        .expect(200);
    });

    it('should not update status without coach role', () => {
      return request(app.getHttpServer())
        .put(`/teams/status-player/${teamId}/${playerId}/ACTIVE`)
        .set('Authorization', `Bearer ${playerToken}`)
        .expect(403);
    });

    it('should not update status with invalid status', () => {
      return request(app.getHttpServer())
        .put(`/teams/status-player/${teamId}/${playerId}/INVALID_STATUS`)
        .set('Authorization', `Bearer ${coachToken}`)
        .expect(400);
    });
  });
});
