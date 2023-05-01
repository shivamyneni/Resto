//import { hot } from "react-hot-loader";
import React from "react";
import axios from "axios";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import add from "../images/add.png";
import search from "../images/search.png";
import deleteimg from "../images/delete.png";
import watchlisted from "../images/watchlisted.png";
//import "./Home.css";

//import Searchbar from "./components/Searchbar";
import MovieCard from "../components/MovieCard";
import logo from "../images/movie.png";
import { Link, useNavigate } from "react-router-dom";
//import data from "./data/data.json";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get("/movies").then((res) => {
      setData(res.data.movies);
    });
  }, []);

  return (
    <div className="Home bg-white h-full">
      <div className="w-full h-[80px] fixed">
        <div className="w-full  h-[80px] p-[10px] bg-white flex items-center justify-between ">
          <div className="flex flex-row  items-center justify-center">
            <img
              src={logo}
              alt="google logo"
              className="h-[40px] w-[40px] ml-[20px]"
            />
            <p className="font-Pathway text-xl ml-[8px] font-bold">
              Box Office Buzz
            </p>
          </div>
          <div className="flex w-1/2  items-center justify-end bg-white pr-[60px] ">
            <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-black">
              <div className="flex flex-row items-center justify-center rounded-md bg-white border-black  overflow-hidden w-full">
                <input
                  type="text"
                  className="w-full rounded-md pl-[4px] focus:outline-none font-Poppins rounded-r-none"
                  placeholder="Search Movies"
                  onChange={(e) => {
                    e.preventDefault();
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      axios.get("/movies").then((res) => {
                        setData(res.data.movies);
                      });
                    } else {
                      axios
                        .get(`/movies/search/${e.target.value}`)
                        .then((res) => {
                          setData(res.data.movies);
                        });
                    }
                  }}
                />
                <img src={search} className="w-[30px] h-[30px] " />
              </div>
            </div>
            <img
              src={watchlisted}
              className="w-[30px] h-[30px] ml-[8px]"
              onClick={() =>
                navigate(`/watchlist/${getAuth().currentUser?.uid}`)
              }
            />

            <img
              className="w-[30px] h-[30px] ml-[8px]"
              src={add}
              onClick={() => navigate(`/movies/add`)}
            />

            <img
              src={deleteimg}
              className="w-[30px] h-[30px] ml-[8px]"
              onClick={() => navigate(`/movies/delete`)}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full h-auto bg-gray-100 flex-col pt-[100px] justify-start items-start">
        {data.length == 0 ? (
          <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <h1 className="text-4xl font-sans font-bold ">
              No Movies to display
            </h1>
          </div>
        ) : (
          <>
            {data?.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
