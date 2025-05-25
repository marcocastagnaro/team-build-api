/*
  Warnings:

  - The primary key for the `Coach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Coach_team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `Player` table. All the data in the column will be lost.
  - The primary key for the `Player_team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `event_match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `formation` on the `event_match` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `event_match` table. All the data in the column will be lost.
  - You are about to drop the column `rival` on the `event_match` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `event_match` table. All the data in the column will be lost.
  - The primary key for the `event_training` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `location` on the `event_training` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `event_training` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `event_training` table. All the data in the column will be lost.
  - The primary key for the `event_type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `player_statistics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comments` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `event_match_id` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `minutes` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `starting` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `sub_in_minute` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the column `sub_out_minute` on the `player_statistics` table. All the data in the column will be lost.
  - You are about to drop the `_PlayerToevent_training` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Player_team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `event_match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_type_id` to the `event_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `event_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assists` to the `player_statistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coach_team" DROP CONSTRAINT "Coach_team_id_coach_fkey";

-- DropForeignKey
ALTER TABLE "Coach_team" DROP CONSTRAINT "Coach_team_id_team_fkey";

-- DropForeignKey
ALTER TABLE "Player_team" DROP CONSTRAINT "Player_team_id_player_fkey";

-- DropForeignKey
ALTER TABLE "Player_team" DROP CONSTRAINT "Player_team_id_team_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToevent_training" DROP CONSTRAINT "_PlayerToevent_training_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToevent_training" DROP CONSTRAINT "_PlayerToevent_training_B_fkey";

-- DropForeignKey
ALTER TABLE "event_match" DROP CONSTRAINT "event_match_team_id_fkey";

-- DropForeignKey
ALTER TABLE "event_training" DROP CONSTRAINT "event_training_team_id_fkey";

-- DropForeignKey
ALTER TABLE "event_training" DROP CONSTRAINT "event_training_type_fkey";

-- DropForeignKey
ALTER TABLE "player_statistics" DROP CONSTRAINT "player_statistics_event_match_id_fkey";

-- DropForeignKey
ALTER TABLE "player_statistics" DROP CONSTRAINT "player_statistics_player_id_fkey";

-- AlterTable
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Coach_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Coach_id_seq";

-- AlterTable
ALTER TABLE "Coach_team" DROP CONSTRAINT "Coach_team_pkey",
ALTER COLUMN "id_coach" SET DATA TYPE TEXT,
ALTER COLUMN "id_team" SET DATA TYPE TEXT,
ADD CONSTRAINT "Coach_team_pkey" PRIMARY KEY ("id_coach", "id_team");

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "status",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Player_id_seq";

-- AlterTable
ALTER TABLE "Player_team" DROP CONSTRAINT "Player_team_pkey",
ADD COLUMN     "status" "PlayerStatus" NOT NULL,
ALTER COLUMN "id_player" SET DATA TYPE TEXT,
ALTER COLUMN "id_team" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_team_pkey" PRIMARY KEY ("id_player", "id_team");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "event_match" DROP CONSTRAINT "event_match_pkey",
DROP COLUMN "formation",
DROP COLUMN "location",
DROP COLUMN "rival",
DROP COLUMN "score",
ADD COLUMN     "status" "EventStatus" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "event_match_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "event_match_id_seq";

-- AlterTable
ALTER TABLE "event_training" DROP CONSTRAINT "event_training_pkey",
DROP COLUMN "location",
DROP COLUMN "repeat",
DROP COLUMN "type",
ADD COLUMN     "event_type_id" TEXT NOT NULL,
ADD COLUMN     "player_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "event_training_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "event_training_id_seq";

-- AlterTable
ALTER TABLE "event_type" DROP CONSTRAINT "event_type_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "event_type_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "event_type_id_seq";

-- AlterTable
ALTER TABLE "player_statistics" DROP CONSTRAINT "player_statistics_pkey",
DROP COLUMN "comments",
DROP COLUMN "event_match_id",
DROP COLUMN "minutes",
DROP COLUMN "score",
DROP COLUMN "starting",
DROP COLUMN "sub_in_minute",
DROP COLUMN "sub_out_minute",
ADD COLUMN     "assists" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "player_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "player_statistics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "player_statistics_id_seq";

-- DropTable
DROP TABLE "_PlayerToevent_training";

-- AddForeignKey
ALTER TABLE "Player_team" ADD CONSTRAINT "Player_team_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_team" ADD CONSTRAINT "Player_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach_team" ADD CONSTRAINT "Coach_team_id_coach_fkey" FOREIGN KEY ("id_coach") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach_team" ADD CONSTRAINT "Coach_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_training" ADD CONSTRAINT "event_training_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "event_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_match" ADD CONSTRAINT "event_match_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_statistics" ADD CONSTRAINT "player_statistics_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
