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
      ? res.send(allUsers)
      : res.send({ error: true, message: `Error getting users` });
  } catch (error) {
    res.send({ error });
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
      ? res.send(user)
      : res.send({ error: true, message: `Error getting user by that id` });
  } catch (error) {
    res.send({ error });
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

      res.send({ message: `User updated`, user: updateUser });
    } else {
      res.send({ message: `Not authorized to update user`, error: true });
    }
  } catch (error) {
    res.send({ message: `Error updating user`, error });
  }
});

router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
      await prisma.user.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      res.send({ message: `User deleted` });
    } else {
      res.send({ message: `Not authorized to delete user`, error: true });
    }
  } catch (error) {
    res.send({ message: `Error deleting user`, error });
  }
});

module.exports = router;
