import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import SignIn from './pages/auth/SignIn'
import Contact from './pages/Contact';
import About from './pages/Dashboard';
import SignUp from './pages/auth/SignUp';
import UserInfo from './pages/auth/UserInfo';
import AddVenue from './pages/AddVenue';
import OwnerView from './pages/OwnerView';
import EmailVerificationSent from './pages/auth/EmailVerificationSent';
import VenueDetails from './pages/VenueDetails';
import AddActivity from './pages/AddActivity';
import UserProfile from './pages/UserProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import CustomerView from './pages/CustomerView';
import VenueDetailsUser from './pages/VenueDetailsUser';
import BookSlot from './pages/BookSlot';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Dashboard/> } />
        <Route path="signin" element={ <SignIn/> } />
        <Route path="signup" element={ <SignUp/> } />
        <Route path="contact" element={ <Contact/> } />
        <Route path="user-info" element={<UserInfo />} />
        <Route path="venues/addVenue" element={<AddVenue />} />
        <Route path="venues" element={<OwnerView />} />
        <Route path="email-verification" element={<EmailVerificationSent/>} />
        <Route path="venues/:id/activities" element={<VenueDetails />} />
        <Route path="venues/:id/activities/addActivity" element={<AddActivity />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:email/:token" element={<ResetPassword />} />
        <Route path="uservenues" element={<CustomerView />} />
        <Route path="uservenues/:id/useractivities" element={<VenueDetailsUser />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="uservenues/:venueid/useractivities/bookslot/:activityid" element={<BookSlot />} />
      </Routes>
    </div>
  );
}