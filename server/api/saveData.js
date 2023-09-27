const router = require("express").Router();
const { requireUser } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allSaveDatas = await prisma.save_Data.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            isAdmin: true,
            isBanned: true,
          },
        },
      },
    });

    allSaveDatas
      ? res.status(500).send(allSaveDatas)
      : res
          .status(400)
          .send({ error: true, message: `Error getting save datas` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.get(`/user/:id`, async (req, res) => {
  try {
    const saveDatas = await prisma.save_Data.findMany({
      where: {
        userId: Number(req.params.id),
      },
    });

    saveDatas
      ? res.status(200).send(saveDatas)
      : res.status(404).send({
          error: true,
          message: `Error getting save datas from that user`,
        });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const saveData = await prisma.save_Data.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    saveData
      ? res.status(200).send(saveData)
      : res.status(404).send({
          error: true,
          message: `Error getting save data by that id`,
        });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.post(`/`, requireUser, async (req, res) => {
  try {
    const newSaveData = await prisma.save_Data.create({
      data: req.body,
    });

    res
      .status(201)
      .send({ message: `Save data created`, saveData: newSaveData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error creating saveData`, error });
  }
});

router.put(`/:id`, requireUser, async (req, res) => {
  try {
    const updateSaveData = await prisma.save_Data.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res
      .status(200)
      .send({ message: `Save data updated`, saveData: updateSaveData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error updating save data`, error });
  }
});

router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    await prisma.save_Data.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).send({ message: `Save data deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error deleting save data`, error });
  }
});

module.exports = router;
