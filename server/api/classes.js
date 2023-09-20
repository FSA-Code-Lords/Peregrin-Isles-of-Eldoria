const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allClasses = await prisma.class.findMany();

    allClasses
      ? res.status(200).send(allClasses)
      : res.status(400).send({ error: true, message: `Error getting classes` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const singleClass = await prisma.class.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    singleClass
      ? res.status(200).send(singleClass)
      : res
          .status(404)
          .send({ error: true, message: `Error getting class by that id` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newClass = await prisma.class.create({
      data: req.body,
    });

    res.status(201).send({ message: `Class created`, class: newClass });
  } catch (error) {
    res.status(500).send({ message: `Error creating class`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateClass = await prisma.class.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).send({ message: `Class updated`, class: updateClass });
  } catch (error) {
    res.status(500).send({ message: `Error updating class`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.class.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Class deleted` });
  } catch (error) {
    res.status(500).send({ message: `Error deleting class`, error });
  }
});

module.exports = router;
