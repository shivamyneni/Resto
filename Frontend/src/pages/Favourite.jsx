import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";
import RestaurantFavouriteCard from "../components/RestaurantFavouriteCard";

const Favourite = () => {
  const params = useParams();
  const [data, setData] = React.useState([]);

  function getWatchlist() {
    console.log("fetched");
    axios.get(`/favourite/${params.userid}`).then((res) => {
      setData([...res.data.favourite]);
    });
  }

  React.useEffect(() => {
    getWatchlist();
    // axios.get(`/favourite/${params.userid}`).then((res) => {
    //   setData(res.data.favourite);
    // });
    // axios.get(`/favourite/${params.userid}`).then((res) => {
    //   console.log(res.data.favourite.length);

    //   setData(res.data.favourite);
    // });
  }, []);
  return (
    <div className="flex flex-col items-start bg-gray-100">
      {/* {data && */}
      {data?.map((item, index) => (
        <RestaurantFavouriteCard
          movie={item}
          key={index}
          refetch={() => getWatchlist()}
        />
      ))}
    </div>
  );
};

export default Favourite;
