const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");
const Favourite = mongoose.model("Favourite");

router.get("/", (req, res) => {
  res.send(req.body.userid);
  Favourite.find({ userid: req.body.userid })
    .then((favourite) => {
      if (!favourite) {
        return res.status(200).json({ 404: "favourite not available" });
      }
      console.log(favourite);
      return res.send({ favourite: favourite });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:userid", (req, res) => {
  //res.send(req.body.userid);
  Favourite.find({ userid: req.params.userid })
    .then((favourite) => {
      if (!favourite) {
        return res.status(200).json({ 404: "favourite not available" });
      }
      console.log(favourite);
      return res.send({ favourite: favourite });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add", (req, res) => {
  const { userid, restaurantname } = req.body;
  if (!userid || !restaurantname) {
    return res.status(200).json({
      error: "please send all data",
      userid: userid,
      restaurantname: restaurantname,
    });
  }
  Favourite.findOne({ userid: userid, restaurantname: restaurantname })
    .then((savedfavourite) => {
      if (savedfavourite) {
        console.log(savedfavourite);
        return res.status(200).json({ error: "restaurant already added" });
      }
      const favourite = new Favourite({
        userid: userid,
        restaurantname: restaurantname,
      });
      favourite
        .save()
        .then((favourite) => {
          return res
            .status(200)
            .json({ message: "restaurant added to favourite" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/", (req, res) => {
  Favourite.find({
    userid: req.body.userid,
    restaurantname: req.body.restaurantname,
  })
    .then((favourite) => {
      if (!favourite) {
        return res.status(200).json({ error: "restaurant not in favourite" });
      }
      Favourite.deleteOne({
        userid: req.body.userid,
        restaurantname: req.body.restaurantname,
      })
        .then((favourite) => {
          return res
            .status(200)
            .json({ message: "restaurant removed from favourite" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
