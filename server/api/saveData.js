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
      ? res.send(allSaveDatas)
      : res.send({ error: true, message: `Error getting save datas` });
  } catch (error) {
    res.send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const saveData = await prisma.save_Data.findUnique({
      where: {
        id: Number(req.params.id),
      },
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

    saveData
      ? res.send(saveData)
      : res.send({
          error: true,
          message: `Error getting save data by that id`,
        });
  } catch (error) {
    res.send({ error });
  }
});

router.post(`/`, requireUser, async (req, res) => {
  try {
    const newSaveData = await prisma.save_Data.create({
      data: req.body,
    });

    res.send({ message: `Save data created`, saveData: newSaveData });
  } catch (error) {
    res.send({ message: `Error creating saveData`, error });
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

    res.send({ message: `Save data updated`, saveData: updateSaveData });
  } catch (error) {
    res.send({ message: `Error updating save data`, error });
  }
});

router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    await prisma.save_Data.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send({ message: `Save data deleted` });
  } catch (error) {
    res.send({ message: `Error deleting save data`, error });
  }
});

module.exports = router;
