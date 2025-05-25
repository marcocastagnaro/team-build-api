/*
  Warnings:

  - You are about to drop the column `status` on the `event_match` table. All the data in the column will be lost.
  - You are about to drop the column `event_type_id` on the `event_training` table. All the data in the column will be lost.
  - You are about to drop the column `player_id` on the `event_training` table. All the data in the column will be lost.
  - You are about to drop the column `assists` on the `player_statistics` table. All the data in the column will be lost.
  - Added the required column `formation` to the `event_match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `event_match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rival` to the `event_match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `event_match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `event_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeat` to the `event_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `event_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_match_id` to the `player_statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutes` to the `player_statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `player_statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starting` to the `player_statistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event_training" DROP CONSTRAINT "event_training_event_type_id_fkey";

-- DropForeignKey
ALTER TABLE "event_training" DROP CONSTRAINT "event_training_player_id_fkey";

-- AlterTable
ALTER TABLE "event_match" DROP COLUMN "status",
ADD COLUMN     "formation" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "rival" TEXT NOT NULL,
ADD COLUMN     "score" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_training" DROP COLUMN "event_type_id",
DROP COLUMN "player_id",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "repeat" "RepeatType" NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "player_statistics" DROP COLUMN "assists",
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "event_match_id" TEXT NOT NULL,
ADD COLUMN     "minutes" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "starting" BOOLEAN NOT NULL,
ADD COLUMN     "sub_in_minute" INTEGER,
ADD COLUMN     "sub_out_minute" INTEGER;

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToevent_training" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlayerToevent_training_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "News_teamId_idx" ON "News"("teamId");

-- CreateIndex
CREATE INDEX "News_createdBy_idx" ON "News"("createdBy");

-- CreateIndex
CREATE INDEX "_PlayerToevent_training_B_index" ON "_PlayerToevent_training"("B");

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_type_fkey" FOREIGN KEY ("type") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_statistics" ADD CONSTRAINT "player_statistics_event_match_id_fkey" FOREIGN KEY ("event_match_id") REFERENCES "event_match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToevent_training" ADD CONSTRAINT "_PlayerToevent_training_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToevent_training" ADD CONSTRAINT "_PlayerToevent_training_B_fkey" FOREIGN KEY ("B") REFERENCES "event_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
