import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import SignIn from "./pages/auth/SignIn";
import Contact from "./pages/Contact";
import SignUp from "./pages/auth/SignUp";
import UserInfo from "./pages/auth/UserInfo";
import AddVenue from "./pages/AddVenue";
import OwnerView from "./pages/OwnerView";
import EmailVerificationSent from "./pages/auth/EmailVerificationSent";
import VenueDetails from "./pages/VenueDetails";
import AddActivity from "./pages/AddActivity";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CustomerView from "./pages/CustomerView";
import VenueDetailsUser from "./pages/VenueDetailsUser";
import BookSlot from "./pages/BookSlot";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddRestaurant from "./pages/AddRestaurant";
import Favourite from "./pages/Favourite";
import DeleteRestaurant from "./pages/DeleteRestaurant";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { getAuth } from "firebase/auth";
import RestaurantDescription from "./pages/RestaurantDescription";
import EditRestaurant from "./pages/EditRestaurant";
export default function App() {
  atom({
    key: "authid",
    default: getAuth().currentUser?.uid,
  });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="restaurants" element={<Home />} />
        <Route path="restaurants/search/:name" element={<Home />} />
        <Route path="restaurants/:name" element={<RestaurantDescription />} />
        <Route path="restaurants/add" element={<AddRestaurant />} />
        <Route path="restaurants/update" element={<EditRestaurant />} />
        <Route path="restaurants/delete" element={<DeleteRestaurant />} />
        <Route path="favourite/:userid" element={<Favourite />} />
        <Route path="signin" element={<SignIn />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="contact" element={<Contact />} />
        <Route path="user-info" element={<UserInfo />} />
        <Route path="venues/addVenue" element={<AddVenue />} />
        <Route path="venues" element={<OwnerView />} />
        <Route path="email-verification" element={<EmailVerificationSent />} />
        <Route path="venues/:id/activities" element={<VenueDetails />} />
        <Route
          path="venues/:id/activities/addActivity"
          element={<AddActivity />}
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="reset-password/:email/:token"
          element={<ResetPassword />}
        />
        <Route path="uservenues" element={<CustomerView />} />
        <Route
          path="uservenues/:id/useractivities"
          element={<VenueDetailsUser />}
        />
        <Route path="user-profile" element={<UserProfile />} />
        <Route
          path="uservenues/:venueid/useractivities/bookslot/:activityid"
          element={<BookSlot />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </div>
  );
}
