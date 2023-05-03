import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import bookmark from "../images/bookmark.png";
const RestaurantCard = (props) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    getRating();
  }, []);

  function getRating() {
    axios
      .get(`/restaurants/ratings/${props.restaurant.name}`)
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
            onClick={() => navigate(`/restaurants/${props.restaurant.name}`)}
          >
            <img
              className="rounded-3xl shadow-lg"
              src={props.restaurant.posterUrl}
              alt=""
            />
          </div>
          <div className="flex flex-col w-1/2 ">
            <div className="flex justify-between items-start">
              <h2 className="text-xl text-start font-bold font-Pathway line-clamp-2">
                {props.restaurant.name}
              </h2>
            </div>
            <h2 className="text-sm text-start font-bold font-Pathway ">
              Cuisine:
            </h2>
            <div className="flex flex-row ">
              {props.restaurant ? (
                props.restaurant.cuisine.map((cuisine) => (
                  <div className="text-sm text-gray-400">{cuisine},</div>
                ))
              ) : (
                <></>
              )}
            </div>
            <h2 className="text-sm text-start  font-bold font-Pathway">
              Location:
            </h2>
            <div className="text-sm text-start text-gray-400">
              {props.restaurant.locationname}
            </div>
            <h2 className="text-sm text-start  font-bold font-Pathway line-clamp-2">
              Description:
            </h2>
            <p className="text-start text-sm text-gray-400 line-clamp-2 ">
              {props.restaurant.description}
            </p>
            <div className="flex flex-row mt-[10px] justify-start items-center">
              <div
                className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-200"
                onClick={(e) => {
                  console.log("clicked");
                  console.log(props.restaurant.name);
                  console.log(getAuth().currentUser.uid);
                  axios
                    .post("/watchlist/add", {
                      restaurantname: props.restaurant.name,
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
              <div className="bg-[#2E8B57] w-[40px] h-[40px] ml-[10px] text-white flex items-center justify-center  font-bold rounded-full ">
                {props.restaurant.overallrating ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
