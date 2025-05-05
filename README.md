# Team Build API

A NestJS-based API for managing sports teams, players, and coaches.

## Features

- User authentication (Players and Coaches)
- Team management
- Player management
- Coach management
- Role-based access control

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/team-build-api.git
cd team-build-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/team_build"
JWT_SECRET="your-secret-key"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run start:dev
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Players

- `POST /players/register` - Register a new player
- `GET /players` - Get all players
- `GET /players/:id` - Get player by ID

### Coaches

- `POST /coaches/register` - Register a new coach
- `GET /coaches` - Get all coaches
- `GET /coaches/:id` - Get coach by ID

### Teams

- `POST /teams` - Create a new team (Coach only)
- `GET /teams/:id` - Get team by ID
- `POST /teams/:id/players/:playerId` - Add player to team (Coach only)

## Technologies Used

- NestJS
- Prisma
- PostgreSQL
- JWT Authentication
- TypeScript

## License

MIT
