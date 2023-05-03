import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import deleteimg from "../images/bin.png";

const RestaurantFavouriteCard = (props) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    console.log(props.movie.restaurantname);
    axios.get(`/restaurants/${props.movie.restaurantname}`).then((res) => {
      console.log(res.data[0]);
      if (res.data[0]) {
        setData(res.data[0]);
      }
      // console.log(data.posterUrl);
    });
  }, []);

  return (
    <div className="min-h-[530px] bg-gray-100 ml-[30px] mb-[10px] flex flex-col justify-center">
      <div className=" sm:max-w-xl bg-gray-100 sm:mx-auto">
        <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-2">
          <div className="h-48  overflow-visible w-1/2">
            <img
              className="rounded-3xl shadow-lg"
              src={data.posterUrl}
              alt=""
            />
          </div>
          <div className="flex flex-col w-1/2 ">
            <div className="flex justify-between items-start">
              <h2 className="text-xl text-start font-bold font-Pathway line-clamp-2">
                {data.name}
              </h2>
            </div>
            <h2 className="text-sm text-start font-bold font-Pathway ">
              Cuisine:
            </h2>
            <div className="flex flex-row ">
              {data ? (
                data?.cuisine?.map((cuisine) => (
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
              {data.locationname}
            </div>
            <h2 className="text-sm text-start  font-bold font-Pathway line-clamp-2">
              Description:
            </h2>
            <p className="text-start text-sm text-gray-400 line-clamp-2 ">
              {data.description}
            </p>
            <div className="flex flex-row mt-[10px] justify-start items-center">
              <div className="bg-[#2E8B57] w-[40px] h-[40px] ml-[10px] text-white flex items-center justify-center  font-bold rounded-full ">
                {data.overallrating ?? 0}
              </div>
              <div
                className="flex text-2xl font-bold text-a p-[8px]"
                onClick={(e) => {
                  console.log("clicked");
                  console.log(data.name);
                  console.log(getAuth().currentUser.uid);
                  axios
                    .delete(`/favourite/delete/`, {
                      data: {
                        restaurantname: data.name,
                        userid: getAuth().currentUser.uid,
                      },
                    })
                    .then((res) => {
                      console.log(res);
                      props.refetch();
                    });
                }}
              >
                <img className="w-[30px] h-[30px] " src={deleteimg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFavouriteCard;
