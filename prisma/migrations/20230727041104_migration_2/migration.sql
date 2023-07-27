/*
  Warnings:

  - You are about to drop the column `fireEmoji` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `poopEmoji` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `userLiked` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "userLiked" DROP CONSTRAINT "userLiked_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "fireEmoji",
DROP COLUMN "poopEmoji";

-- DropTable
DROP TABLE "userLiked";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
