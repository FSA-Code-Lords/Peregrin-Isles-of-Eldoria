const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send(`Woohoo auth route`);
});

router.post("/register", async (req, res) => {
  try {
    const user = req.body;

    user.password = await bcryptjs.hash(user.password, 4);

    const result = await prisma.user.create({
      data: user,
    });

    if (result) {
      const token = jwt.sign({ id: result.id }, process.env.JWT);

      res.status(201).send({ token });
    } else {
      res.send({ message: "Could not add User" });
    }
  } catch (error) {
    res.send({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT);
        res.send({ token });
      } else {
        res.send({ message: "Invalid Login" });
      }
    } else {
      res.send({ message: "Invalid Login" });
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
