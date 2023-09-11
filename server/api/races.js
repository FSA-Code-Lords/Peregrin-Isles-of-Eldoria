const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const alllRaces = await prisma.race.findMany();

    alllRaces
      ? res.send(alllRaces)
      : res.send({ error: true, message: `Error getting classes` });
  } catch (error) {
    res.send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const race = await prisma.race.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    race
      ? res.send(race)
      : res.send({ error: true, message: `Error getting race by that id` });
  } catch (error) {
    res.send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newRace = await prisma.race.create({
      data: req.body,
    });

    res.send({ message: `Race created`, race: newRace });
  } catch (error) {
    res.send({ message: `Error creating race`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateRace = await prisma.race.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.send({ message: `Race updated`, race: updateRace });
  } catch (error) {
    res.send({ message: `Error updating race`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.race.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send({ message: `Race deleted` });
  } catch (error) {
    res.send({ message: `Error deleting race`, error });
  }
});

module.exports = router;
