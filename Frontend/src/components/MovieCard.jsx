import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import bookmark from "../images/bookmark.png";
const MovieCard = (props) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    getRating();
  }, []);

  function getRating() {
    axios
      .get(`/movies/ratings/${props.movie.name}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          console.log(res);
          //setValue(res.data[0].rating);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="min-h-[530px] bg-gray-100 ml-[30px] mb-[10px] flex flex-col justify-center">
      <div className=" sm:max-w-xl bg-gray-100 sm:mx-auto">
        <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-2">
          <div
            className="h-48 overflow-visible w-1/2"
            onClick={() => navigate(`/movies/${props.movie.name}`)}
          >
            <img
              className="rounded-3xl shadow-lg"
              src={props.movie.posterUrl}
              alt=""
            />
          </div>
          <div className="flex flex-col w-1/2 ">
            <div className="flex justify-between items-start">
              <h2 className="text-xl text-start font-bold font-Pathway line-clamp-2">
                {props.movie.name}
              </h2>
            </div>
            <h2 className="text-sm text-start font-bold font-Pathway ">
              Genre:
            </h2>
            <div className="flex flex-row ">
              {props.movie ? (
                props.movie.genre.map((genre) => (
                  <div className="text-sm text-gray-400">{genre},</div>
                ))
              ) : (
                <></>
              )}
            </div>
            <h2 className="text-sm text-start  font-bold font-Pathway">
              Director:
            </h2>
            <div className="text-sm text-start text-gray-400">
              {props.movie.directorname}
            </div>
            <h2 className="text-sm text-start  font-bold font-Pathway line-clamp-2">
              Description:
            </h2>
            <p className="text-start text-sm text-gray-400 line-clamp-2 ">
              {props.movie.description}
            </p>
            <div className="flex flex-row mt-[10px] justify-start items-center">
              <div
                className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-200"
                onClick={(e) => {
                  console.log("clicked");
                  console.log(props.movie.name);
                  console.log(getAuth().currentUser.uid);
                  axios
                    .post("/watchlist/add", {
                      moviename: props.movie.name,
                      userid: getAuth().currentUser.uid,
                    })
                    .then((res) => {
                      console.log(res);
                    });
                }}
              >
                <img
                  src={bookmark}
                  className="flex text-2xl    w-[20px] bg-indigo h-[20px]"
                />
              </div>
              <div className="bg-yellow-400 w-[40px] h-[40px] ml-[10px] flex items-center justify-center  font-bold rounded-full ">
                7.2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
