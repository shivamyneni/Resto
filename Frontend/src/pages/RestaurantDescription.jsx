import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import edit from "../images/edit.png";
import deleteimg from "../images/delete.png";
import { getAuth } from "firebase/auth";
import { Rating } from "@mui/material";
import check from "../images/check.png";
import { useNavigate } from "react-router";
import add from "../images/more.png";
import { Link } from "react-router-dom";
const RestaurantDescription = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = React.useState([]);
  const [ratingData, setRatingData] = React.useState([]);
  const [ratingValue, setRatingValue] = React.useState(0);
  const [reviewed, setReviewed] = React.useState(false);
  const [editRating, setEditRating] = React.useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    console.log(params.name);
    const res = await axios.get(`/restaurants/${params.name}`);
    setRestaurant(res.data[0]);
  };
  React.useEffect(() => {
    axios.get(`/restaurants/${params.name}`).then((res) => {
      setRestaurant(res.data[0]);
      setRatingValue(res.data[0].overallrating);
    });
  }, []);

  React.useEffect(() => {
    axios
      .get(`/restaurants/rating/${getAuth()?.currentUser?.uid}${params.name}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setReviewed(true);
        }
      });
  }, [getAuth()?.currentUser?.uid]);

  React.useEffect(() => {
    axios
      .get(`/restaurants/reviews/${params.name}`)
      .then((res) => {
        console.log(res.data);
        setRatingData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // React.useEffect(() => {
  //   axios.get('/')
  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <Link to="/restaurants/update" state={restaurant}>
        <div
          className="absolute  left-[37%] flex flex-row  top-[40px]"
          //onClick={() => navigate("/restaurants/update")}
        >
          <img className="w-[25px] h-[25px]" src={edit} />
          <p className="font-Pathway font-bold ml-[10px]">Edit Restaurant</p>
        </div>
      </Link>
      <div
        className="absolute  left-2/3 flex flex-row top-[40px]"
        onClick={() => {
          //   console.log(restaurant.name, restaurant.locationname);
          axios
            .delete(`/restaurants/delete/`, {
              data: {
                name: restaurant.name,
                locationname: restaurant.locationname,
                userid: getAuth()?.currentUser?.uid,
              },
            })
            .then((res) => {
              console.log(res);
              navigate("/restaurants");
            });
        }}
      >
        <img className="w-[25px] h-[25px]" src={deleteimg} />
        <p className="font-Pathway font-bold ml-[10px]">Delete Restaurant</p>
      </div>
      <div className="h-screen bg-gray-100 bg-cover w-1/3">
        <img
          className="h-full w-full shadow-lg"
          src={restaurant?.posterUrl ?? ""}
          alt=""
        />
      </div>
      <div className="flex flex-col w-2/3 justify-start pt-[120px] pl-[60px] bg-gray-100 items-start space-y-4">
        <div className="flex justify-start items-center">
          <h2 className="text-4xl uppercase  font-bold font-sans">
            {restaurant?.name ?? ""}
          </h2>
        </div>
        <div className="flex items-start">
          <p className="font-Pathway text-sm text-start">
            {restaurant?.description ?? ""}
          </p>
        </div>
        <div className="flex flex-row">
          <div className="text-md text-black font-Pathway ">Cuisine:</div>
          {restaurant &&
            restaurant?.cuisine?.map((cuisine) => (
              <div className="text-md text-gray-500 font-Pathway">
                {cuisine},
              </div>
            ))}
        </div>
        <div className="flex flex-row">
          <div className="text-md text-black font-Pathway ">Location:</div>
          <div className="text-md text-gray-500 ml-[10px]">
            {restaurant?.locationname ?? ""}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex felx-row items-center justify-center">
            <div className="bg-[#2E8B57] w-[40px] h-[40px] text-white ml-[10px] flex items-center justify-center  font-bold rounded-full ">
              {ratingValue ?? 0}
            </div>
            <div className="text-md ml-[10px] text-black font-Pathway ">{`${restaurant?.ratings?.length} review`}</div>
          </div>

          {/* {editRating ? (
            <img
              className="w-[20px] h-[20px] mt-[6px] ml-[8px]"
              src={check}
              onClick={() => {
                setEditRating(!editRating);
                axios
                  .post("/restaurants/add/rating", {
                    name: restaurant.name,
                    userid: getAuth().currentUser.uid,
                    rating: ratingValue,
                    review: "",
                  })

                  .then((res) => {
                    getData();
                  })

                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          ) : (
            <img
              className="w-[20px] h-[20px] mt-[6px] ml-[8px]"
              src={edit}
              onClick={() => setEditRating(!editRating)}
            />
          )} */}
        </div>
        <div className="flex flex-row">
          <div className="text-md text-black font-Pathway ">Reviews:</div>
        </div>
        {reviewed ? (
          <div></div>
        ) : (
          <>
            <div className="flex flex-row">
              <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
                <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
                  <input
                    value={restaurant.reviews}
                    onChange={(e) => {
                      setRestaurant({
                        ...restaurant,
                        reviews: e.target.value,
                      });
                    }}
                    type="text"
                    name="name"
                    id="name"
                    className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
                    placeholder="review"
                  />
                </div>
              </div>
              <Rating value={ratingValue} setValue={setRatingValue} />
            </div>
            <button
              onClick={() => {
                setReviewed(true);
                axios
                  .post("/restaurants/add/rating", {
                    name: restaurant.name,
                    userid: getAuth()?.currentUser?.uid,
                    rating: ratingValue,
                    reviews: restaurant.reviews,
                  })

                  .then((res) => {
                    getData();
                  })

                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="w-fit h-fit bg-[#2E8B57] text-white rounded-md  px-[20px] py-[10px] font-bold font-Pathway"
            >
              Add Review
            </button>
          </>
        )}

        {ratingData.map((rating) => (
          <>
            {rating.userid === getAuth()?.currentUser?.uid ? (
              <div className="flex flex-row items-center">
                {editRating ? (
                  <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
                    <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
                      <input
                        value={restaurant.reviews}
                        onChange={(e) => {
                          setRestaurant({
                            ...restaurant,
                            reviews: e.target.value,
                          });
                        }}
                        type="text"
                        name="name"
                        id="name"
                        className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
                        placeholder="Restaurant name"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <Rating value={rating.rating} readOnly />
                      <div className="ml-[10px]">{rating.reviews}</div>
                      <div
                        onClick={() => {
                          console.log(rating.ratingid);
                          axios
                            .delete(`/restaurants/rating/${rating.ratingid}`)
                            .then((res) => {
                              console.log(res);
                              getData();
                            });
                        }}
                        className=""
                      >
                        <img
                          className="w-[20px] h-[20px] ml-[8px]"
                          src={deleteimg}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {editRating ? (
                  <Rating
                    name="enabled"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                      setRestaurant({
                        ...restaurant,
                        rating: newValue,
                      });
                    }}
                  />
                ) : (
                  // <Rating name="disabled" value={ratingValue} disabled />
                  <></>
                )}

                {editRating ? (
                  <img
                    className="w-[20px] h-[20px]  ml-[8px]"
                    src={check}
                    onClick={() => {
                      setEditRating(!editRating);
                      axios
                        .post("/restaurants/add/rating", {
                          name: restaurant.name,
                          userid: getAuth()?.currentUser?.uid,
                          rating: ratingValue,
                          reviews: restaurant.reviews,
                        })

                        .then((res) => {
                          getData();
                        })

                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                ) : (
                  <img
                    className="w-[20px] h-[20px]  ml-[8px]"
                    src={edit}
                    onClick={() => setEditRating(!editRating)}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ))}

        {ratingData.map((rating) => (
          <>
            {rating.userid === getAuth()?.currentUse?.uid ? (
              <></>
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <Rating value={rating.rating} readOnly />
                  <div className="ml-[10px]">{rating.reviews}</div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDescription;
