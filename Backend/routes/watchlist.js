const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");
const Watchlist = mongoose.model("Watchlist");

router.get("/", (req, res) => {
  res.send(req.body.userid);
  Watchlist.find({ userid: req.body.userid })
    .then((watchlist) => {
      if (!watchlist) {
        return res.status(200).json({ 404: "watchlist not available" });
      }
      console.log(watchlist);
      return res.send({ watchlist: watchlist });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:userid", (req, res) => {
  //res.send(req.body.userid);
  Watchlist.find({ userid: req.params.userid })
    .then((watchlist) => {
      if (!watchlist) {
        return res.status(200).json({ 404: "watchlist not available" });
      }
      console.log(watchlist);
      return res.send({ watchlist: watchlist });
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
  Watchlist.findOne({ userid: userid, restaurantname: restaurantname })
    .then((savedwatchlist) => {
      if (savedwatchlist) {
        console.log(savedwatchlist);
        return res.status(200).json({ error: "restaurant already added" });
      }
      const watchlist = new Watchlist({
        userid: userid,
        restaurantname: restaurantname,
      });
      watchlist
        .save()
        .then((watchlist) => {
          return res
            .status(200)
            .json({ message: "restaurant added to watchlist" });
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
  Watchlist.find({
    userid: req.body.userid,
    restaurantname: req.body.restaurantname,
  })
    .then((watchlist) => {
      if (!watchlist) {
        return res.status(200).json({ error: "restaurant not in watchlist" });
      }
      Watchlist.deleteOne({
        userid: req.body.userid,
        restaurantname: req.body.restaurantname,
      })
        .then((watchlist) => {
          return res
            .status(200)
            .json({ message: "restaurant removed from watchlist" });
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
