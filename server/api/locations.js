const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allLocations = await prisma.location.findMany({
      include: {
        quests: true,
        monsters: true,
        items: true,
      },
    });

    allLocations
      ? res.send(allLocations)
      : res.send({ error: true, message: `Error getting locations` });
  } catch (error) {
    res.send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        quests: true,
        monsters: true,
        items: true,
      },
    });

    location
      ? res.send(location)
      : res.send({ error: true, message: `Error getting location by that id` });
  } catch (error) {
    res.send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newLocation = await prisma.location.create({
      data: req.body,
    });

    res.send({ message: `Location created`, location: newLocation });
  } catch (error) {
    res.send({ message: `Error creating location`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateLocation = await prisma.location.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.send({ message: `Location updated`, location: updateLocation });
  } catch (error) {
    res.send({ message: `Error updating location`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.location.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send({ message: `Location deleted` });
  } catch (error) {
    res.send({ message: `Error deleting location`, error });
  }
});

module.exports = router;
