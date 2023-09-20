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
      ? res.status(200).send(allMonsters)
      : res.status(400).send({ error: true, message: `Error getting items` });
  } catch (error) {
    res.status(500).send({ error });
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
      ? res.status(200).send(monster)
      : res
          .status(404)
          .send({ error: true, message: `Error getting monster by that id` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newMonster = await prisma.monster.create({
      data: req.body,
    });

    res.status(201).send({ message: `Monster created`, monster: newMonster });
  } catch (error) {
    res.status(500).send({ message: `Error creating monster`, error });
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

    res
      .status(200)
      .send({ message: `Monster updated`, monster: updateMonster });
  } catch (error) {
    res.status(500).send({ message: `Error updating monster`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.monster.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Monster deleted` });
  } catch (error) {
    res.status(500).send({ message: `Error deleting monster`, error });
  }
});

module.exports = router;
