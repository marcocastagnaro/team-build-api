/*
  Warnings:

  - You are about to drop the `_CoachToTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerToTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoachToTeam" DROP CONSTRAINT "_CoachToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoachToTeam" DROP CONSTRAINT "_CoachToTeam_B_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_B_fkey";

-- DropTable
DROP TABLE "_CoachToTeam";

-- DropTable
DROP TABLE "_PlayerToTeam";

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "PlayerTeam_pkey" PRIMARY KEY ("playerId","teamId")
);

-- CreateTable
CREATE TABLE "CoachTeam" (
    "coachId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "CoachTeam_pkey" PRIMARY KEY ("coachId","teamId")
);

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachTeam" ADD CONSTRAINT "CoachTeam_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachTeam" ADD CONSTRAINT "CoachTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
