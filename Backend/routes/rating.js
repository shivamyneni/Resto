const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");
const Rating = mongoose.model("Ratings");
router.get("/", (req, res) => {
  res.send(req.body.userid);
});

router.get("/:ratingid", (req, res) => {
  Rating.find({ ratingid: req.params.ratingid })
    .then((rating) => {
      if (!rating) {
        return res.status(200).json({ 404: "rating not available" });
      }

      return res.send(rating[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
