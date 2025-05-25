# Team Build API

A NestJS-based API for managing sports teams, players, and coaches.

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

Or run it with Docker:

```bash
docker-compose up --build
```

## Swagger Documentation
The API documentation is available at `http://localhost:8080/api`.

## Connect to DB on DATAGRIP
1. Open DataGrip and create a new connection.
2. Select PostgreSQL as the database type.
3. Enter the following connection url: jdbc:postgresql://localhost:5432/nestdb with password postgres



## Run Formatter
```bash
npm run format
```
