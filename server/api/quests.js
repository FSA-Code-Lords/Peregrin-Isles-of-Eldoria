const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const allQuests = await prisma.quest.findMany({
      include: {
        choices: {
          include: {
            followUpChoices: {
              include: {
                followUpChoices: true,
              },
            },
          },
        },
      },
    });

    allQuests
      ? res.send(allQuests)
      : res.send({ error: true, message: `Error getting quests` });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
