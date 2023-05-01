const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");
const Directors = mongoose.model("Directors");

router.get("/", (req, res) => {
  Directors.find()
    .then((directors) => {
      if (!directors) {
        return res.status(200).json({ 404: "directors not available" });
      }
      console.log(directors);
      return res.send({ directors: directors });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:name", (req, res) => {
  Directors.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((directors) => {
      if (!directors) {
        return res.send("director not available");
      }
      return res.send({ directors: directors });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
