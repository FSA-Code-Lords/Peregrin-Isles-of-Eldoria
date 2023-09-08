const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Woohoo auth route");
});

module.exports = router;
