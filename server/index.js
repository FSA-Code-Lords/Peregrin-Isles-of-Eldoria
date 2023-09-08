const express = require("express");
const app = express();
const PORT = 4444;

app.use(require("body-parser").json());

app.use(require("morgan")("dev"));

app.get(`/`, (req, res) => {
  // link html here later
  res.send(`Woohoo server route!`);
});

app.use(`/api`, require(`./api`));
app.use(`/auth`, require(`./auth`));

app.listen(PORT, (error) => {
  !error
    ? console.log(`SERVER RUNNING ON PORT ${PORT}`)
    : console.log(`SUMTING WONG`);
});
