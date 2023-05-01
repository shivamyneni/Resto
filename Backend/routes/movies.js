const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");

const Movies = mongoose.model("Movies");
const Directors = mongoose.model("Directors");
const Watchlist = mongoose.model("Watchlist");
const Ratings = mongoose.model("Ratings");

router.get("/", (req, res) => {
  Movies.find()
    .then((movies) => {
      if (!movies) {
        return res.status(200).json({ 404: "movies not available" });
      }
      console.log(movies);
      return res.send({ movies: movies });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/search/:name", (req, res) => {
  Movies.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((movies) => {
      if (!movies) {
        return res.send("movie not available");
      }
      return res.send({ movies: movies });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:name", (req, res) => {
  Movies.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((movie) => {
      if (!movie) {
        return res.send("movie not available");
      }
      return res.send(movie);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add", (req, res) => {
  const { name, directorname, posterUrl, genre, description } = req.body;
  //return res.send(req.body.name);
  if (
    !req.body.name ||
    !req.body.directorname ||
    !req.body.posterUrl ||
    !req.body.description
  ) {
    return res.status(200).json({ error: "please send all data" });
  }
  Movies.findOne({ name: name, directorname: directorname })
    .then((savedmovie) => {
      if (savedmovie) {
        console.log(savedmovie);
        return res.status(200).json({ error: "movie already added" });
      }
      const movie = new Movies({
        name: name,
        directorname: directorname,
        posterUrl: posterUrl,
        genre: genre,
        description: description,
      });
      movie
        .save()
        .then((movie) => {
          return res.status(200).json({ message: "movie added to database" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  Directors.findOne({ name: directorname })
    .then((director) => {
      if (!director) {
        const director = new Directors({
          name: directorname,
          DirectedMovies: [name],
        });
        director.save().then((director) => {
          return res
            .status(200)
            .json({ message: "director added to database" });
        });
      } else {
        director.DirectedMovies.push(name);
        director.save().then((director) => {
          return res
            .status(200)
            .json({ message: "director added to database" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete", (req, res) => {
  const { name, directorname, userid } = req.body;

  if (!name || !directorname) {
    return res.status(200).json({ error: "please send all data" });
  }
  Movies.findOne({ name: name, directorname: directorname })

    .then((movie) => {
      if (!movie) {
        return res.status(200).json({ error: "movie not available" });
      }
      Movies.deleteOne({ name: name, directorname: directorname })
        .then((movie) => {
          return res.status(200).json({ message: "movie deleted" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  Directors.findOne({ name: directorname })
    .then((director) => {
      if (!director) {
        return res.status(200).json({ error: "director not available" });
      }
      Directors.findOneAndUpdate(
        { name: directorname },
        { $pull: { DirectedMovies: name } },
        { new: true }
      )
        .then((director) => {
          return res.status(200).json({ message: "director updated" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  Watchlist.findOne({ userid: userid, moviename: name })
    .then((watchlist) => {
      if (!watchlist) {
        return res.status(200).json({ error: "movie not available" });
      }
      Watchlist.deleteOne({ userid: userid, moviename: name })
        .then((watchlist) => {
          return res.status(200).json({ message: "movie deleted" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add/rating", (req, res) => {
  const { name, userid, rating } = req.body;
  if (!name || !userid || !rating) {
    return res.status(200).json({ error: "please send all data" });
  }
  Movies.findOne({ name: name })
    .then((movie) => {
      if (!movie) {
        return res.status(200).json({ error: "movie not available" });
      }
      Ratings.findOneAndUpdate(
        { userid: userid, moviename: name },
        { rating: req.body.rating },
        { new: true }
      ).then((rating) => {
        if (rating) {
          return res.status(200).json({ message: "rating updated" });
        } else {
          const rating = new Ratings({
            userid: userid,
            moviename: name,
            rating: req.body.rating,
            ratingid: `${userid}${name}`,
          });
          rating.save().then((rating) => {
            return res.status(200).json({ message: "rating added" });
          });
        }
      });
      if (movie.ratings.length == 0) {
        movie.ratings.push(`${userid}${name}`);
        movie.save().then((movie) => {
          return res.status(200).json({ message: movie });
        });
      } else {
        movie.ratings.forEach((element) => {
          if (element != `${userid}${name}`) {
            movie.ratings.push(`${userid}${name}`);
            movie.save().then((movie) => {
              return res.status(200).json({ message: "rating added" });
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/ratings/:name", (req, res) => {
  Movies.findOne({ name: req.params.name })
    .then((movie) => {
      if (!movie) {
        return res.status(200).json({ error: "movie not available" });
      }
      return res.status(200).json({ ratings: movie.ratings });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
