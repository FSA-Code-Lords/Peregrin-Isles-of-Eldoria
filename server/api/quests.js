const router = require("express").Router();
const { requireAdmin } = require("./utils");

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
      ? res.status(200).send(allQuests)
      : res.status(400).send({ error: true, message: `Error getting quests` });
  } catch (error) {
    res.status(500).send({ error });
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
      ? res.status(200).send(quest)
      : res
          .status(404)
          .send({ error: true, message: `Error getting quest by that id` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newQuest = await prisma.quest.create({
      data: req.body,
    });

    res.status(201).send({ message: `Quest created`, quest: newQuest });
  } catch (error) {
    res.status(500).send({ message: `Error creating quest`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateQuest = await prisma.quest.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).send({ message: `Quest updated`, quest: updateQuest });
  } catch (error) {
    res.status(500).send({ message: `Error updating quest`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.quest.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Quest deleted` });
  } catch (error) {
    res.status(500).send({ message: `Error deleting quest`, error });
  }
});

module.exports = router;
