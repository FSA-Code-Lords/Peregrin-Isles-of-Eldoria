const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allLocations = await prisma.location.findMany({
      include: {
        quests: {
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
            monsters: true,
            items: true,
          },
        },
        monsters: true,
        items: true,
      },
    });

    allLocations
      ? res.status(200).send(allLocations)
      : res
          .status(400)
          .send({ error: true, message: `Error getting locations` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        quests: {
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
            monsters: true,
            items: true,
          },
        },
        monsters: true,
        items: true,
      },
    });

    location
      ? res.status(200).send(location)
      : res
          .status(404)
          .send({ error: true, message: `Error getting location by that id` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newLocation = await prisma.location.create({
      data: req.body,
    });

    res
      .status(201)
      .send({ message: `Location created`, location: newLocation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error creating location`, error });
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

    res
      .status(200)
      .send({ message: `Location updated`, location: updateLocation });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error updating location`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.location.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Location deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error deleting location`, error });
  }
});

module.exports = router;
