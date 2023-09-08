-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "completionMessage" TEXT NOT NULL,
    "failedMessage" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "action" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "hp" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "dodge" INTEGER NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "hpChange" INTEGER NOT NULL,
    "atkChange" INTEGER NOT NULL,
    "dodgeChange" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "hpChange" INTEGER NOT NULL,
    "atkChange" INTEGER NOT NULL,
    "dodgeChange" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Save_Data" (
    "id" SERIAL NOT NULL,
    "serializedData" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Save_Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToLocation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ChoiceToLocation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_choices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_name_key" ON "Quest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Choice_name_key" ON "Choice"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Monster_name_key" ON "Monster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToLocation_AB_unique" ON "_ItemToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToLocation_B_index" ON "_ItemToLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChoiceToLocation_AB_unique" ON "_ChoiceToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_ChoiceToLocation_B_index" ON "_ChoiceToLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_choices_AB_unique" ON "_choices"("A", "B");

-- CreateIndex
CREATE INDEX "_choices_B_index" ON "_choices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToMonster_AB_unique" ON "_LocationToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToMonster_B_index" ON "_LocationToMonster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToQuest_AB_unique" ON "_LocationToQuest"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToQuest_B_index" ON "_LocationToQuest"("B");

-- AddForeignKey
ALTER TABLE "Save_Data" ADD CONSTRAINT "Save_Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToLocation" ADD CONSTRAINT "_ItemToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToLocation" ADD CONSTRAINT "_ItemToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoiceToLocation" ADD CONSTRAINT "_ChoiceToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Choice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoiceToLocation" ADD CONSTRAINT "_ChoiceToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_choices" ADD CONSTRAINT "_choices_A_fkey" FOREIGN KEY ("A") REFERENCES "Choice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_choices" ADD CONSTRAINT "_choices_B_fkey" FOREIGN KEY ("B") REFERENCES "Choice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToMonster" ADD CONSTRAINT "_LocationToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToMonster" ADD CONSTRAINT "_LocationToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToQuest" ADD CONSTRAINT "_LocationToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToQuest" ADD CONSTRAINT "_LocationToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
