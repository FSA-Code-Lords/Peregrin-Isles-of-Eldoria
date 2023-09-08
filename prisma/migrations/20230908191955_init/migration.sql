/*
  Warnings:

  - You are about to drop the `_choices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_choices" DROP CONSTRAINT "_choices_A_fkey";

-- DropForeignKey
ALTER TABLE "_choices" DROP CONSTRAINT "_choices_B_fkey";

-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "choiceId" INTEGER;

-- DropTable
DROP TABLE "_choices";

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
