const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Woohoo api route");
});

router.use(`/quests`, require(`./quests`));
router.use(`/locations`, require(`./locations`));
router.use(`/classes`, require(`./classes`));
router.use(`/races`, require(`./races`));
router.use(`/items`, require(`./items`));

module.exports = router;
