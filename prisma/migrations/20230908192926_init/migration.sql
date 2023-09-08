/*
  Warnings:

  - You are about to drop the column `choiceId` on the `Choice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_choiceId_fkey";

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "choiceId";

-- CreateTable
CREATE TABLE "_choices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_choices_AB_unique" ON "_choices"("A", "B");

-- CreateIndex
CREATE INDEX "_choices_B_index" ON "_choices"("B");

-- AddForeignKey
ALTER TABLE "_choices" ADD CONSTRAINT "_choices_A_fkey" FOREIGN KEY ("A") REFERENCES "Choice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_choices" ADD CONSTRAINT "_choices_B_fkey" FOREIGN KEY ("B") REFERENCES "Choice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
