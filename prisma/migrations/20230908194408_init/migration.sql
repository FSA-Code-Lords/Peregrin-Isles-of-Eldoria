-- CreateTable
CREATE TABLE "_ItemToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ChoiceToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MonsterToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToQuest_AB_unique" ON "_ItemToQuest"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToQuest_B_index" ON "_ItemToQuest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChoiceToQuest_AB_unique" ON "_ChoiceToQuest"("A", "B");

-- CreateIndex
CREATE INDEX "_ChoiceToQuest_B_index" ON "_ChoiceToQuest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MonsterToQuest_AB_unique" ON "_MonsterToQuest"("A", "B");

-- CreateIndex
CREATE INDEX "_MonsterToQuest_B_index" ON "_MonsterToQuest"("B");

-- AddForeignKey
ALTER TABLE "_ItemToQuest" ADD CONSTRAINT "_ItemToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToQuest" ADD CONSTRAINT "_ItemToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoiceToQuest" ADD CONSTRAINT "_ChoiceToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Choice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoiceToQuest" ADD CONSTRAINT "_ChoiceToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToQuest" ADD CONSTRAINT "_MonsterToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToQuest" ADD CONSTRAINT "_MonsterToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
