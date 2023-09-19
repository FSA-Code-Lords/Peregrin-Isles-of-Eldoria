const router = require("express").Router();
const { requireAdmin } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allItems = await prisma.item.findMany();

    allItems
      ? res.status(200).send(allItems)
      : res.status(400).send({ error: true, message: `Error getting items` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    item
      ? res.status(200).send(item)
      : res
          .status(404)
          .send({ error: true, message: `Error getting item by that id` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(`/`, requireAdmin, async (req, res) => {
  try {
    const newItem = await prisma.item.create({
      data: req.body,
    });

    res.status(201).send({ message: `Item created`, item: newItem });
  } catch (error) {
    res.status(500).send({ message: `Error creating item`, error });
  }
});

router.put(`/:id`, requireAdmin, async (req, res) => {
  try {
    const updateItem = await prisma.item.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).send({ message: `Item updated`, item: updateItem });
  } catch (error) {
    res.status(500).send({ message: `Error updating item`, error });
  }
});

router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    await prisma.item.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Item deleted` });
  } catch (error) {
    res.status(500).send({ message: `Error deleting item`, error });
  }
});

module.exports = router;
