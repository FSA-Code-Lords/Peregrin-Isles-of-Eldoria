const router = require("express").Router();
const { requireUser } = require("./utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        isAdmin: true,
        isBanned: true,
        saveData: true,
      },
    });

    allUsers
      ? res.status(200).send(allUsers)
      : res.status(400).send({ error: true, message: `Error getting users` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
        isBanned: true,
        saveData: true,
      },
    });

    user
      ? res.status(200).send(user)
      : res
          .status(404)
          .send({ error: true, message: `Error getting user by that id` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.put(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
      const updateUser = await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });

      res.status(200).send({ message: `User updated`, user: updateUser });
    } else {
      res
        .status(401)
        .send({ message: `Not authorized to update user`, error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error updating user`, error });
  }
});

router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
      const deleteSaveDatas = await prisma.save_Data.deleteMany({
        where: {
          userId: Number(req.params.id),
        },
      });

      const deleteUser = await prisma.user.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      const transaction = await prisma.$transaction([
        deleteSaveDatas,
        deleteUser,
      ]);

      transaction
        ? res.status(200).send({ message: `User deleted` })
        : res.status(404).send({ message: `Error finding user`, error: true });
    } else {
      res
        .status(401)
        .send({ message: `Not authorized to delete user`, error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error deleting user`, error });
  }
});

module.exports = router;
