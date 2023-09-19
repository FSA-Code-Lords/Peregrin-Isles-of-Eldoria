const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allChoices = await prisma.choice.findMany({
      include: {
        followUpChoices: true,
      },
    });

    allChoices
      ? res.status(200).send(allChoices)
      : res.status(400).send({ error: true, message: `Error getting choices` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const singleChoice = await prisma.choice.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        followUpChoices: true,
      },
    });

    singleChoice
      ? res.status(200).send(singleChoice)
      : res
          .status(404)
          .send({ error: true, message: `Error getting choice by that id` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newChoice = await prisma.choice.create({
      data: req.body,
    });

    res.status(201).send({ message: `Choice created`, choice: newChoice });
  } catch (error) {
    res.status(500).send({ message: `Error creating choice`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateChoice = await prisma.choice.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).send({ message: `Choice updated`, choice: updateChoice });
  } catch (error) {
    res.status(500).send({ message: `Error updating choice`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.choice.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Choice deleted` });
  } catch (error) {
    res.status(500).send({ message: `Error deleting choice`, error });
  }
});

module.exports = router;
