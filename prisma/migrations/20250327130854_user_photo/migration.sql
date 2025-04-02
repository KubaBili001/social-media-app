/*
  Warnings:

  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `photo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "text" VARCHAR(250),
ALTER COLUMN "photo" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT NOT NULL;
