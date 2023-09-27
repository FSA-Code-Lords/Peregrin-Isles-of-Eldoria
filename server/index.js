const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = 4444;
const path = require("path");
require("dotenv").config();

app.use(require("body-parser").json());

app.use(require("morgan")("dev"));

app.use(async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith(`Bearer `) ? auth.slice(7) : null;

  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.userId = id;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    req.isAdmin = user.isAdmin;
  } catch (error) {
    req.userId = null;
  }

  next();
});

app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.use(`/api`, require(`./api`));
app.use(`/auth`, require(`./auth`));

app.listen(PORT, (error) => {
  !error
    ? console.log(`SERVER RUNNING ON PORT ${PORT}`)
    : console.log(`SUMTING WONG`);
});
