/*
  Warnings:

  - You are about to drop the `CoachTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoachTeam" DROP CONSTRAINT "CoachTeam_coachId_fkey";

-- DropForeignKey
ALTER TABLE "CoachTeam" DROP CONSTRAINT "CoachTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerTeam" DROP CONSTRAINT "PlayerTeam_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerTeam" DROP CONSTRAINT "PlayerTeam_teamId_fkey";

-- DropTable
DROP TABLE "CoachTeam";

-- DropTable
DROP TABLE "PlayerTeam";

-- CreateTable
CREATE TABLE "Player_team" (
    "id_player" INTEGER NOT NULL,
    "id_team" INTEGER NOT NULL,

    CONSTRAINT "Player_team_pkey" PRIMARY KEY ("id_player","id_team")
);

-- CreateTable
CREATE TABLE "Coach_team" (
    "id_coach" INTEGER NOT NULL,
    "id_team" INTEGER NOT NULL,

    CONSTRAINT "Coach_team_pkey" PRIMARY KEY ("id_coach","id_team")
);

-- AddForeignKey
ALTER TABLE "Player_team" ADD CONSTRAINT "Player_team_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_team" ADD CONSTRAINT "Player_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach_team" ADD CONSTRAINT "Coach_team_id_coach_fkey" FOREIGN KEY ("id_coach") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach_team" ADD CONSTRAINT "Coach_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
