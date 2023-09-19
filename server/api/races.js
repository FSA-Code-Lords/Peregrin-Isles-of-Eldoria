const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allRaces = await prisma.race.findMany();

    allRaces
      ? res.status(200).send(allRaces)
      : res.status(400).send({ error: true, message: `Error getting races` });
  } catch (error) {
    res.status(500).send({ error });
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
      ? res.status(200).send(race)
      : res
          .status(404)
          .send({ error: true, message: `Error getting race by that id` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newRace = await prisma.race.create({
      data: req.body,
    });

    res.status(201).send({ message: `Race created`, race: newRace });
  } catch (error) {
    res.status(500).send({ message: `Error creating race`, error });
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

    res.status(200).send({ message: `Race updated`, race: updateRace });
  } catch (error) {
    res.status(500).send({ message: `Error updating race`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.race.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Race deleted` });
  } catch (error) {
    res.status(500).send({ message: `Error deleting race`, error });
  }
});

module.exports = router;
