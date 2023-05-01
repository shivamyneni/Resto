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
  const { userid, moviename } = req.body;
  if (!userid || !moviename) {
    return res.status(200).json({
      error: "please send all data",
      userid: userid,
      moviename: moviename,
    });
  }
  Watchlist.findOne({ userid: userid, moviename: moviename })
    .then((savedwatchlist) => {
      if (savedwatchlist) {
        console.log(savedwatchlist);
        return res.status(200).json({ error: "movie already added" });
      }
      const watchlist = new Watchlist({
        userid: userid,
        moviename: moviename,
      });
      watchlist
        .save()
        .then((watchlist) => {
          return res.status(200).json({ message: "movie added to watchlist" });
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
    moviename: req.body.moviename,
  })
    .then((watchlist) => {
      if (!watchlist) {
        return res.status(200).json({ error: "movie not in watchlist" });
      }
      Watchlist.deleteOne({
        userid: req.body.userid,
        moviename: req.body.moviename,
      })
        .then((watchlist) => {
          return res
            .status(200)
            .json({ message: "movie removed from watchlist" });
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
