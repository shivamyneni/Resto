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
import add from "../images/more.png";
import search from "../images/search.png";
import deleteimg from "../images/bin.png";
import watchlisted from "../images/heart.png";
//import "./Home.css";

//import Searchbar from "./components/Searchbar";
import RestaurantCard from "../components/RestaurantCard";
import logo from "../images/restaurant.png";
import { Link, useNavigate } from "react-router-dom";
//import data from "./data/data.json";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get("/restaurants").then((res) => {
      setData(res.data.restaurants);
    });
  }, []);

  return (
    <div className="Home bg-white h-full">
      <div className="w-full h-[80px] fixed">
        <div className="w-full  h-[80px] p-[10px] bg-white flex items-center  ">
          <div className="flex flex-row  items-center justify-center">
            <img
              src={logo}
              alt="google logo"
              className="h-[40px] w-[40px] ml-[20px]"
            />
            <p className="font-Pathway text-[#2E8B57] text-2xl ml-[8px] font-bold">
              Resto Gossip
            </p>
          </div>
          <div className="flex  items-center ml-[100px] justify-start bg-white pr-[60px] ">
            <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57] w-[500px]">
              <div className="flex flex-row items-center justify-center rounded-md bg-white border-black  overflow-hidden w-full">
                <input
                  type="text"
                  className="w-full rounded-md pl-[4px] focus:outline-none font-Poppins rounded-r-none"
                  placeholder="Search Restaurants"
                  onChange={(e) => {
                    e.preventDefault();
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      axios.get("/restaurants").then((res) => {
                        setData(res.data.restaurants);
                      });
                    } else {
                      axios
                        .get(`/restaurants/search/${e.target.value}`)
                        .then((res) => {
                          setData(res.data.restaurants);
                        });
                    }
                  }}
                />
                <img src={search} className="w-[30px] h-[30px] " />
              </div>
            </div>
          </div>
          <div className="flex flex-row bg-white w-1/3 justify-end ">
            <img
              src={watchlisted}
              className="w-[30px] h-[30px] ml-[8px]"
              onClick={() =>
                navigate(`/favourite/${getAuth().currentUser?.uid}`)
              }
            />

            <img
              className="w-[30px] h-[30px] ml-[8px]"
              src={add}
              onClick={() => navigate(`/restaurants/add`)}
            />

            <img
              src={deleteimg}
              className="w-[30px] h-[30px] ml-[8px]"
              onClick={() => navigate(`/restaurants/delete`)}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full h-auto bg-gray-100 flex-col pt-[100px] justify-start items-start">
        {data.length == 0 ? (
          <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <h1 className="text-4xl font-sans text-[#2E8B57] font-bold ">
              No Restaurants to display
            </h1>
          </div>
        ) : (
          <>
            {data?.map((item) => (
              <RestaurantCard key={item.id} restaurant={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
