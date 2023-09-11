const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
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

router.get(`/:id`, async (req, res) => {
  try {
    const quest = await prisma.quest.findUnique({
      where: {
        id: Number(req.params.id),
      },
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

    quest
      ? res.send(quest)
      : res.send({ error: true, message: `Error getting quest by that id` });
  } catch (error) {
    res.send({ error });
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newQuest = await prisma.quest.create({
      data: req.body,
    });

    res.send({ message: `Quest created`, quest: newQuest });
  } catch (error) {
    res.send({ message: `Error creating quest`, error });
  }
});

router.put(`/:id`, async (req, res) => {
  try {
    const updateQuest = await prisma.quest.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.send({ message: `Quest updated`, quest: updateQuest });
  } catch (error) {
    res.send({ message: `Error updating quest`, error });
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    await prisma.quest.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send({ message: `Quest deleted` });
  } catch (error) {
    res.send({ message: `Error deleting quest`, error });
  }
});

module.exports = router;
