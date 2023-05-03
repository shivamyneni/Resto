const express = require("express");
const router = express.Router({ mergeParams: true });

const mongoose = require("mongoose");

const Restaurants = mongoose.model("Restaurants");
//const Locations = mongoose.model("Locations");
const Watchlist = mongoose.model("Watchlist");
const Ratings = mongoose.model("Ratings");
const Locations = mongoose.model("Locations");

router.get("/", (req, res) => {
  Restaurants.find()
    .then((restaurants) => {
      if (!restaurants) {
        return res.status(200).json({ 404: "restaurants not available" });
      }
      console.log(restaurants);
      return res.send({ restaurants: restaurants });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/search/:name", (req, res) => {
  Restaurants.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((restaurants) => {
      if (!restaurants) {
        return res.send("restaurant not available");
      }
      return res.send({ restaurants: restaurants });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:name", (req, res) => {
  Restaurants.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((restaurant) => {
      if (!restaurant) {
        return res.send("restaurant not available");
      }
      return res.send(restaurant);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/update", (req, res) => {
  const { name, locationname, posterUrl, cuisine, description } = req.body;
  //return res.send(req.body);
  if (
    !req.body.name ||
    !req.body.locationname ||
    !req.body.posterUrl ||
    !req.body.description ||
    !req.body.cuisine
  ) {
    return res.status(200).json({ error: "please send all data" });
  }
  Restaurants.findOneAndUpdate(
    { name: name, locationname: locationname },
    {
      $set: {
        name: name,
        locationname: locationname,
        posterUrl: posterUrl,
        cuisine: cuisine,
        description: description,
      },
    },
    { new: true }
  )
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(200).json({ error: "restaurant not found" });
      }
      return res.status(200).json({ message: "restaurant updated" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add", (req, res) => {
  const { name, locationname, posterUrl, cuisine, description } = req.body;
  //return res.send(req.body);
  if (
    !req.body.name ||
    !req.body.locationname ||
    !req.body.posterUrl ||
    !req.body.description ||
    !req.body.cuisine
  ) {
    return res.status(200).json({ error: "please send all data" });
  }
  Restaurants.findOne({ name: name, locationname: locationname })
    .then((savedmovie) => {
      if (savedmovie) {
        console.log(savedmovie);
        return res.status(200).json({ error: "restaurant already added" });
      }
      const restaurant = new Restaurants({
        name: name,
        locationname: locationname,
        posterUrl: posterUrl,
        cuisine: cuisine,
        description: description,
      });
      restaurant
        .save()
        .then((restaurant) => {
          return res
            .status(200)
            .json({ message: "restaurant added to database" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  Locations.findOne({ name: locationname })
    .then((location) => {
      if (!location) {
        const location = new Locations({
          name: locationname,
          LocatedRestaurants: [name],
        });
        location.save();
      } else {
        location.LocatedRestaurants.push(name);
        location.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete", (req, res) => {
  const { name, locationname, userid } = req.body;

  if (!name || !locationname) {
    return res.status(200).json({ error: "please send all data" });
  }
  Restaurants.findOne({ name: name, locationname: locationname })

    .then((restaurant) => {
      if (!restaurant) {
        return res.status(200).json({ error: "restaurant not available" });
      }
      Restaurants.deleteOne({ name: name, locationname: locationname })
        .then((restaurant) => {
          return res.status(200).json({ message: "restaurant deleted" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  Locations.findOne({ name: locationname })
    .then((location) => {
      if (!location) {
        //return res.status(200).json({ error: "location not available" });
      }
      Locations.findOneAndUpdate(
        { name: locationname },
        { $pull: { LocatedRestaurants: name } },
        { new: true }
      )
        .then((location) => {
          //return res.status(200).json({ message: "location updated" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  Watchlist.findOne({ userid: userid, restaurantname: name })
    .then((watchlist) => {
      if (!watchlist) {
        //return res.status(200).json({ error: "restaurant not available" });
      }
      Watchlist.deleteOne({ userid: userid, restaurantname: name })
        .then((watchlist) => {
          //return res.status(200).json({ message: "restaurant deleted" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  Ratings.findOne({ userid: userid, restaurantname: name })
    .then((rating) => {
      if (!rating) {
        //return res.status(200).json({ error: "restaurant not available" });
      }
      Ratings.deleteOne({ userid: userid, restaurantname: name })
        .then((rating) => {
          //return res.status(200).json({ message: "restaurant deleted" });
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
  Restaurants.findOne({ name: name })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(200).json({ error: "restaurant not available" });
      }
      Ratings.findOneAndUpdate(
        { userid: userid, restaurantname: name },
        { rating: req.body.rating },
        { new: true }
      ).then((rating) => {
        if (rating) {
          //return res.status(200).json({ message: "rating updated" });
        } else {
          const rating = new Ratings({
            userid: userid,
            restaurantname: name,
            rating: req.body.rating,
            ratingid: `${userid}${name}`,
          });
          rating.save();
        }
      });
      if (restaurant.ratings.length == 0) {
        restaurant.ratings.push(`${userid}${name}`);
        restaurant.save();
      } else {
        restaurant.ratings.forEach((element) => {
          if (element != `${userid}${name}`) {
            restaurant.ratings.push(`${userid}${name}`);
            restaurant.save();
          }
        });
      }
    })
    .then((restaurant) => {
      Ratings.find({ restaurantname: name }).then((ratings) => {
        // Calculate the average rating
        const totalRating = ratings.reduce(
          (sum, rating) => sum + rating.rating,
          0
        );
        const avgRating = totalRating / ratings.length;

        // Update the restaurant's overallrating field with the average rating
        Restaurants.findOneAndUpdate(
          { name: name },
          { overallrating: avgRating },
          { new: true } // Return the updated document
        ).then((updatedRestaurant) => {
          updatedRestaurant.save();
        });
      });
    })
    .then((updatedRestaurant) => {
      return res.status(200).json({ message: "rating added" });
    })
    .catch((error) => {
      console.error(`Error updating restaurant overall rating: ${error}`);
    });
});

router.get("/ratings/:name", (req, res) => {
  Restaurants.findOne({ name: req.params.name })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(200).json({ error: "restaurant not available" });
      }
      return res.status(200).json({ ratings: restaurant.ratings });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:name/updateOverallRating", (req, res) => {
  Ratings.find({ restaurantname: req.params.name })
    .then((ratings) => {
      // Calculate the average rating
      const totalRating = ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const avgRating = totalRating / ratings.length;

      // Update the restaurant's overallrating field with the average rating
      Restaurants.findOneAndUpdate(
        { name: req.params.name },
        { overallrating: avgRating },
        { new: true } // Return the updated document
      );
    })
    // .then((updatedRestaurant) => {
    //   console.log(
    //     `Updated restaurant ${updatedRestaurant.name} with overall rating ${updatedRestaurant.overallrating}`
    //   );
    // })
    .catch((error) => {
      console.error(`Error updating restaurant overall rating: ${error}`);
    });
});

//Find all the restaurants with a particular cuisine in a particular location and having an overall rating greater than a particular value
// router.get("/complex1", (req, res) => {
//   Restaurants.aggregate([
//     {
//       $lookup: {
//         from: "ratings",
//         localField: "name",
//         foreignField: "restaurantname",
//         as: "ratings",
//       },
//     },
//     {
//       $addFields: {
//         overallRating: { $avg: "$ratings.rating" },
//       },
//     },
//     {
//       $lookup: {
//         from: "locations",
//         localField: "locationname",
//         foreignField: "name",
//         as: "location",
//       },
//     },
//     {
//       $match: {
//         "location.name": "New york",
//         cuisine: "American",
//         overallRating: { $gt: 2 },
//       },
//     },
//   ])
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({ result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.get("/complex1", (req, res) => {
  // Find all the restaurants that have been rated by at least two users and received a rating of 3 or higher from every user
  Restaurants.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "name",
        foreignField: "restaurantname",
        as: "ratings",
      },
    },
    {
      $match: {
        ratings: {
          $exists: true,
          $not: {
            $size: 0,
          },
          $all: {
            $elemMatch: {
              rating: { $gte: 1 },
            },
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        cuisine: 1,
        locationname: 1,
        overallRating: 1,
      },
    },
  ])
    .then((restaurants) => {
      console.log(restaurants);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
