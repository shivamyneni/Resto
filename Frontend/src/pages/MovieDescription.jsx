import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import edit from "../images/edit.png";
import deleteimg from "../images/delete.png";
import { getAuth } from "firebase/auth";
import { Rating } from "@mui/material";
import check from "../images/check.png";
import { useNavigate } from "react-router";
const MovieDescription = () => {
  const params = useParams();
  const [movie, setMovie] = React.useState([]);
  const [ratingData, setRatingData] = React.useState({
    avgRating: 0,
    ratingCount: 0,
  });
  const [ratingValue, setRatingValue] = React.useState(0);
  const [retrievedRating, setRetrievedRating] = React.useState([]);
  const [editRating, setEditRating] = React.useState(false);
  const navigate = useNavigate();
  //   React.useEffect(() => {
  //     calculateRatings();
  //   }, [movie]);

  function calculateRatings() {
    let sum = 0;
    let count = 0;
    console.log(movie);
    console.log("calculating");
    let ratingsArray = [];
    console.log(movie?.ratings?.length);
    if (movie?.ratings?.length === 0) {
      setRatingData({
        avgRating: 0,
        ratingCount: 0,
      });
    } else {
      for (let i = 0; i < movie?.ratings?.length; i++) {
        //   console.log(movie.ratings);
        axios.get(`/rating/${movie.ratings[i]}`).then((res) => {
          // ratingsArray.push(res.data.rating);
          console.log(res.rating);
          //setRetrievedRating([...retrievedRating, res.rating]);
          // console.log(res.data.rating[i].rating);
        });
      }
      //   setRatingData({
      //     avgRating: sum / movie?.ratings?.length,
      //     ratingCount: movie?.ratings?.length,
      //   });
    }
    console.log(ratingsArray);
  }

  function getData() {
    axios.get(`/movies/${params.name}`).then((res) => {
      //   console.log(res.data[0]);
      setMovie(res.data[0]);
    });
  }
  React.useEffect(() => {
    axios
      .get(`/movies/${params.name}`)
      .then((res) => {
        //   console.log(res.data[0]);
        setMovie(res.data[0]);
      })
      .then(() => {
        let sum = 0;
        let count = 0;
        console.log(movie);
        console.log("calculating");
        let ratingsArray = [];
        console.log(movie?.ratings?.length);
        if (movie?.ratings?.length === 0) {
          setRatingData({
            avgRating: 0,
            ratingCount: 0,
          });
        } else {
          for (let i = 0; i < movie?.ratings?.length; i++) {
            //   console.log(movie.ratings);
            axios.get(`/rating/${movie.ratings[i]}`).then((res) => {
              // ratingsArray.push(res.data.rating);
              console.log(res.rating);
              //setRetrievedRating([...retrievedRating, res.rating]);
              // console.log(res.data.rating[i].rating);
            });
          }
          //   setRatingData({
          //     avgRating: sum / movie?.ratings?.length,
          //     ratingCount: movie?.ratings?.length,
          //   });
        }
      });
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <div className="absolute  left-1/3 flex flex-row top-[40px]">
        <img className="w-[25px] h-[25px]" src={edit} />
        <p className="font-Pathway font-bold ml-[10px]">Edit Movie</p>
      </div>
      <div
        className="absolute  left-2/3 flex flex-row top-[40px]"
        onClick={() => {
          //   console.log(movie.name, movie.directorname);
          axios
            .delete(`/movies/delete/`, {
              data: {
                name: movie.name,
                directorname: movie.directorname,
                userid: getAuth().currentUser.uid,
              },
            })
            .then((res) => {
              console.log(res);
              navigate("/movies");
            });
        }}
      >
        <img className="w-[25px] h-[25px]" src={deleteimg} />
        <p className="font-Pathway font-bold ml-[10px]">Delete Movie</p>
      </div>
      <div className="h-screen bg-gray-100 overflow-visible w-1/3">
        <img className="h-full shadow-lg" src={movie?.posterUrl ?? ""} alt="" />
      </div>
      <div className="flex flex-col w-2/3 justify-start pt-[100px] bg-gray-100 items-start space-y-4">
        <div className="flex justify-start items-center">
          <h2 className="text-4xl uppercase  font-bold font-sans">
            {movie?.name ?? ""}
          </h2>
        </div>
        <div className="flex items-start">
          <p className="font-Pathway text-sm text-start">
            {movie?.description ?? ""}
          </p>
        </div>
        <div className="flex flex-row">
          {movie &&
            movie?.genre?.map((genre) => (
              <div className="text-md text-gray-500 font-Pathway">{genre},</div>
            ))}
        </div>
        <div className="flex flex-row">
          <div className="text-md text-black font-Pathway ">Director:</div>
          <div className="text-md text-gray-500 ml-[10px]">
            {movie?.directorname ?? ""}
          </div>
        </div>
        <div className="flex flex-row">
          {editRating ? (
            <Rating
              name="enabled"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              enable
            />
          ) : (
            <>
              <Rating name="read-only" value={ratingData.avgRating} readOnly />
              <div className="text-md text-black font-Pathway ">{`${ratingData.ratingCount} review`}</div>
            </>
          )}
          {editRating ? (
            <img
              className="w-[20px] h-[20px] ml-[8px]"
              src={check}
              onClick={() => {
                axios
                  .post("/movies/add/rating", {
                    name: movie.name,
                    userid: getAuth().currentUser.uid,
                    rating: ratingValue,
                  })
                  .then((res) => {
                    setEditRating(!editRating);
                    calculateRatings();
                  });
                //   .then(() => {
                //     //console.log(movie)
                //     // setEditRating(!editRating);
                //     //console.log(ratingData.avgRating);
                //   });
              }}
            />
          ) : (
            <img
              className="w-[20px] h-[20px] ml-[8px]"
              src={edit}
              onClick={() => setEditRating(!editRating)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
