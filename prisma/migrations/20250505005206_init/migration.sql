-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'INJURED', 'INACTIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('CAPTAIN', 'OTHER');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('RED', 'YELLOW', 'OTHER');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('GK', 'DF', 'MF', 'FW', 'OTHER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'OTHER');

-- CreateEnum
CREATE TYPE "RepeatType" AS ENUM ('MONTHLY', 'WEEKLY', 'YEARLY', 'NONE');

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "status" "PlayerStatus" NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "PlayerRole" NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player_team" (
    "id" SERIAL NOT NULL,
    "id_team" INTEGER NOT NULL,
    "id_player" INTEGER NOT NULL,

    CONSTRAINT "Player_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_team" (
    "id" SERIAL NOT NULL,
    "id_team" INTEGER NOT NULL,
    "id_coach" INTEGER NOT NULL,

    CONSTRAINT "coach_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "event_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_training" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "status" "EventStatus" NOT NULL,
    "repeat" "RepeatType" NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "event_training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_training_player" (
    "id" SERIAL NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_player" INTEGER NOT NULL,
    "assist" BOOLEAN NOT NULL,
    "late" BOOLEAN NOT NULL,

    CONSTRAINT "event_training_player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_match" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rival" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "formation" TEXT NOT NULL,

    CONSTRAINT "event_match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_statistics" (
    "id" SERIAL NOT NULL,
    "minutes" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "cards" "CardType" NOT NULL,
    "position" "Position" NOT NULL,
    "comments" TEXT,
    "player_id" INTEGER NOT NULL,
    "event_match_id" INTEGER NOT NULL,
    "starting" BOOLEAN NOT NULL,
    "sub_in_minute" INTEGER,
    "sub_out_minute" INTEGER,

    CONSTRAINT "player_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_mail_key" ON "Player"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_mail_key" ON "Coach"("mail");

-- AddForeignKey
ALTER TABLE "Player_team" ADD CONSTRAINT "Player_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_team" ADD CONSTRAINT "Player_team_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_team" ADD CONSTRAINT "coach_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_team" ADD CONSTRAINT "coach_team_id_coach_fkey" FOREIGN KEY ("id_coach") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_type_fkey" FOREIGN KEY ("type") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training_player" ADD CONSTRAINT "event_training_player_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "event_training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training_player" ADD CONSTRAINT "event_training_player_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_match" ADD CONSTRAINT "event_match_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_statistics" ADD CONSTRAINT "player_statistics_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_statistics" ADD CONSTRAINT "player_statistics_event_match_id_fkey" FOREIGN KEY ("event_match_id") REFERENCES "event_match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
