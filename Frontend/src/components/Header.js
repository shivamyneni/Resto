import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import add from "../images/more.png";
import search from "../images/search.png";
import deleteimg from "../images/bin.png";
import watchlisted from "../images/heart.png";
//import "./Home.css";

//import Searchbar from "./components/Searchbar";
import RestaurantCard from "../components/RestaurantCard";
import logo from "../images/restaurant.png";
import ChatIcon from "@mui/icons-material/Chat";

export default function NavBar(props) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const tabstate = useSelector((state) => state.currentTab);
  const { activeTab } = tabstate;
  const history = useLocation();
  const dispatch = useDispatch();
  const changeTab = (value) => {
    dispatch({ type: "changeTab", payload: value });
  };
  useEffect(() => {
    const path = history.pathname.slice(1);
    const homeRoute = path.split("/")[0];
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    dispatch({ type: "changeTab", payload: homeRoute });
    return () => unsubscribe();
  }, [dispatch, history.pathname, user, auth]);

  const runSearch = (query) => navigate(`/uservenues/${query}`);

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.reload();
    });
  };

  return (
    <nav className="w-full shadow sticky top-0 bg-white">
      <div className="w-full  h-[80px] p-[10px] bg-white flex items-center justify-between  ">
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

        <div className="flex flex-row bg-white w-1/3 justify-end ">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[#2E8B57] text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="font-semibold font-Pathway text-[#2E8B57] text-md mr-[20px]"
              onClick={() => {
                changeTab("signin");
              }}
            >
              Login/SignUp
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
