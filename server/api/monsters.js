const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allMonsters = await prisma.monster.findMany({
      include: {
        location: true,
        quests: true,
      },
    });

    allMonsters
      ? res.send(allMonsters)
      : res.send({ error: true, message: `Error getting items` });
  } catch (error) {
    res.send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const monster = await prisma.monster.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        location: true,
        quests: true,
      },
    });

    monster
      ? res.send(monster)
      : res.send({ error: true, message: `Error getting monster by that id` });
  } catch (error) {
    res.send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newMonster = await prisma.monster.create({
      data: req.body,
    });

    res.send({ message: `Monster created`, monster: newMonster });
  } catch (error) {
    res.send({ message: `Error creating monster`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateMonster = await prisma.monster.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.send({ message: `Monster updated`, monster: updateMonster });
  } catch (error) {
    res.send({ message: `Error updating monster`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.monster.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send({ message: `Monster deleted` });
  } catch (error) {
    res.send({ message: `Error deleting monster`, error });
  }
});

module.exports = router;
