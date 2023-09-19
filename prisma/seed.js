const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

async function main() {
  // ADMIN
  await prisma.user.create({
    data: {
      username: `xXxDragonSlayerxXx`,
      password: await bcryptjs.hash(`password`, 4),
      isAdmin: true,
    },
  });

  // Races
  await prisma.race.createMany({
    data: [
      {
        name: `Human`,
        description: `Homo Sapiens have large brain to body ratio.`,
        hpChange: 0,
        atkChange: 0,
        dodgeChange: 0,
      },
      {
        name: `Elf`,
        description: `Elfius Gondolinicus are nimble and quick.`,
        hpChange: -5,
        atkChange: 0,
        dodgeChange: 5,
      },
      {
        name: `Orc`,
        description: `Orcim Neanderthalensis attack with brute force.`,
        hpChange: 5,
        atkChange: 5,
        dodgeChange: -10,
      },
    ],
  });

  // Classes
  await prisma.class.createMany({
    data: [
      {
        name: `Warrior`,
        description: `Warriors show great bravery and courage.`,
        hpChange: 2,
        atkChange: 1,
        dodgeChange: -3,
      },
      {
        name: `Assassin`,
        description: `Assassins operate through the shadows, attacking critical points.`,
        hpChange: -10,
        atkChange: 5,
        dodgeChange: 5,
      },
      {
        name: `Mage`,
        description: `Mages hurl powerful spells at their enemies.`,
        hpChange: -5,
        atkChange: 10,
        dodgeChange: -5,
      },
      {
        name: `Knight`,
        description: `Knights vigorously protect the people dear to them.`,
        hpChange: 12,
        atkChange: -3,
        dodgeChange: -9,
      },
    ],
  });

  // Items
  const itemPie = await prisma.item.create({
    data: {
      name: `Pie`,
      description: `A nice pipin' hot pie. Mmmmm... smells like apple.`,
    },
  });

  // Choices
  const choiceRun = await prisma.choice.create({
    data: {
      name: `Run`,
      action: `You hurry out of the area.`,
      result: `Got out safely.`,
    },
  });

  const choiceContinueFighting = await prisma.choice.create({
    data: {
      name: `Continue fighting`,
      action: `You attack again!`,
      result: `Damage dealt: `,
    },
  });

  await prisma.choice.update({
    where: {
      name: `Continue fighting`,
    },
    data: {
      followUpChoices: {
        connect: [choiceContinueFighting, choiceRun],
      },
    },
  });

  const choiceFight = await prisma.choice.create({
    data: {
      name: `Fight`,
      action: `You charge in!`,
      result: `Damage dealt: `,
      followUpChoices: {
        connect: [choiceContinueFighting, choiceRun],
      },
    },
  });

  const choiceSneak = await prisma.choice.create({
    data: {
      name: `Sneak`,
      action: `You try to sneak around...`,
      result: `Sneaking `, // successful or failed
      followUpChoices: {
        connect: [choiceFight, choiceRun], // if sneak failed
      },
    },
  });

  // Monsters
  const monsterOrc = await prisma.monster.create({
    data: {
      name: `Nicolaus Coporcius`,
      hp: 50,
      atk: 15,
      dodge: 5,
    },
  });

  // Quests
  const questGetPie = await prisma.quest.create({
    data: {
      name: `Get the Pi3!`,
      description: `There is a big bad orc in your way. That pie smells so good tho...`,
      completionMessage: `You got the pie!! Yum!`,
      failedMessage: `Waawaa no pie 4 u`,
      choices: {
        connect: [choiceFight, choiceRun, choiceSneak],
      },
      monsters: {
        connect: [monsterOrc],
      },
      items: {
        connect: [itemPie],
      },
    },
  });

  // Locations
  await prisma.location.create({
    data: {
      name: `Start Town`,
      description: `All the comforts of home`,
      quests: {
        connect: [questGetPie],
      },
    },
  });

  await prisma.location.createMany({
    data: [
      {
        name: `North Forest`,
        description: `A dense and mystical woodland teeming with ancient trees and hidden secrets`,
      },
      {
        name: `Misty Swamp`,
        description: `A murky and treacherous wetland cloaked in mist, concealing both peril and mystique`,
      },
      {
        name: `Black Thorn Tavern`,
        description: `Exuding an otherworldly ambiance, there is a roaring hearth, and a formidable orc savoring a steaming pie`,
      },
      {
        name: `Three Courtesans Market`,
        description: `A bustling market with merchants showcasing their exotic wares`,
      },
      {
        name: `Eldoria Castle`,
        description: `The imposing castle stands tall with its grand wooden drawbridge at the entrance`,
      },
      {
        name: `Eldoria Castle Interior`,
        description: `Explore the opulent grandeur of the Eldoria Castle's interior, adorned with majestic tapestries and shimmering chandeliers, where secrets and challenges await`,
      },
    ],
  });

}
main()
  .then(async () => {
    console.log(`SUCCESFULLY SEEDED`);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
