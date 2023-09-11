const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Woohoo api route");
});

router.use(`/quests`, require(`./quests`));
router.use(`/locations`, require(`./locations`));

module.exports = router;
