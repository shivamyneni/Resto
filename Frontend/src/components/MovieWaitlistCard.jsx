import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
const MovieWaitlistCard = (props) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    console.log(props.movie.moviename);
    axios.get(`/movies/${props.movie.moviename}`).then((res) => {
      console.log(res.data[0]);
      if (res.data[0]) {
        setData(res.data[0]);
      }
      // console.log(data.posterUrl);
    });
  }, []);

  return (
    <div className="min-h-[520px] bg-gray-100 ml-[30px] flex flex-col justify-center">
      <div className=" sm:max-w-xl bg-gray-100 sm:mx-auto">
        <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-2">
          <div className="h-48 overflow-visible w-1/2">
            <img
              className="rounded-3xl shadow-lg"
              src={data.posterUrl}
              alt=""
            />
          </div>
          <div className="flex flex-col w-1/2 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <div className="bg-yellow-400 font-bold rounded-xl p-2">7.2</div>
            </div>
            <div className="flex flex-row">
              {data.genre ? (
                data.genre.map((genre) => (
                  <div className="text-sm text-gray-400">{genre},</div>
                ))
              ) : (
                <></>
              )}
            </div>
            <p className=" text-gray-400 max-h-40 overflow-y-hidden">
              {data.description}
            </p>

            <div
              className="flex text-2xl font-bold text-a p-[8px]"
              onClick={(e) => {
                console.log("clicked");
                console.log(data.name);
                console.log(getAuth().currentUser.uid);
                axios
                  .delete(`/watchlist/delete/`, {
                    data: {
                      moviename: data.name,
                      userid: getAuth().currentUser.uid,
                    },
                  })
                  .then((res) => {
                    console.log(res);
                    props.refetch();
                  });
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieWaitlistCard;
