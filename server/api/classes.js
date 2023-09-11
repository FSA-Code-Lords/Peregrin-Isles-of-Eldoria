const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allClasses = await prisma.class.findMany();

    allClasses
      ? res.send(allClasses)
      : res.send({ error: true, message: `Error getting classes` });
  } catch (error) {
    res.send({ error });
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
      ? res.send(singleClass)
      : res.send({ error: true, message: `Error getting class by that id` });
  } catch (error) {
    res.send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newClass = await prisma.class.create({
      data: req.body,
    });

    res.send({ message: `Class created`, class: newClass });
  } catch (error) {
    res.send({ message: `Error creating class`, error });
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

    res.send({ message: `Class updated`, class: updateClass });
  } catch (error) {
    res.send({ message: `Error updating class`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.class.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send({ message: `Class deleted` });
  } catch (error) {
    res.send({ message: `Error deleting class`, error });
  }
});

module.exports = router;
