/*
  Warnings:

  - You are about to drop the `Player_team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coach_team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_training_player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player_team" DROP CONSTRAINT "Player_team_id_player_fkey";

-- DropForeignKey
ALTER TABLE "Player_team" DROP CONSTRAINT "Player_team_id_team_fkey";

-- DropForeignKey
ALTER TABLE "coach_team" DROP CONSTRAINT "coach_team_id_coach_fkey";

-- DropForeignKey
ALTER TABLE "coach_team" DROP CONSTRAINT "coach_team_id_team_fkey";

-- DropForeignKey
ALTER TABLE "event_training_player" DROP CONSTRAINT "event_training_player_id_event_fkey";

-- DropForeignKey
ALTER TABLE "event_training_player" DROP CONSTRAINT "event_training_player_id_player_fkey";

-- DropTable
DROP TABLE "Player_team";

-- DropTable
DROP TABLE "coach_team";

-- DropTable
DROP TABLE "event_training_player";

-- CreateTable
CREATE TABLE "_PlayerToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlayerToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PlayerToevent_training" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlayerToevent_training_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CoachToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CoachToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlayerToTeam_B_index" ON "_PlayerToTeam"("B");

-- CreateIndex
CREATE INDEX "_PlayerToevent_training_B_index" ON "_PlayerToevent_training"("B");

-- CreateIndex
CREATE INDEX "_CoachToTeam_B_index" ON "_CoachToTeam"("B");

-- AddForeignKey
ALTER TABLE "_PlayerToTeam" ADD CONSTRAINT "_PlayerToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeam" ADD CONSTRAINT "_PlayerToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToevent_training" ADD CONSTRAINT "_PlayerToevent_training_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToevent_training" ADD CONSTRAINT "_PlayerToevent_training_B_fkey" FOREIGN KEY ("B") REFERENCES "event_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToTeam" ADD CONSTRAINT "_CoachToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToTeam" ADD CONSTRAINT "_CoachToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
