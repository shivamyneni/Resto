import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useParams } from "react-router";
import MovieWaitlistCard from "../components/MovieWaitlistCard";

const Watchlist = () => {
  const params = useParams();
  const [data, setData] = React.useState([]);

  function getWatchlist() {
    console.log("fetched");
    axios.get(`/watchlist/${params.userid}`).then((res) => {
      setData([...res.data.watchlist]);
    });
  }

  React.useEffect(() => {
    getWatchlist();
    // axios.get(`/watchlist/${params.userid}`).then((res) => {
    //   setData(res.data.watchlist);
    // });
    // axios.get(`/watchlist/${params.userid}`).then((res) => {
    //   console.log(res.data.watchlist.length);

    //   setData(res.data.watchlist);
    // });
  }, []);
  return (
    <div>
      {/* {data && */}
      {data.map((item, index) => (
        <MovieWaitlistCard
          movie={item}
          key={index}
          refetch={() => getWatchlist()}
        />
      ))}
    </div>
  );
};

export default Watchlist;
