import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import SignIn from './pages/auth/SignIn'
import Contact from './pages/Contact';
import About from './pages/About';
import SignUp from './pages/auth/SignUp';
import UserInfo from './pages/auth/UserInfo';
import AddVenue from './pages/AddVenue';
import OwnerView from './pages/OwnerView';
import VenueDetails from './pages/VenueDetails';
import AddActivity from './pages/AddActivity';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <About/> } />
        <Route path="signin" element={ <SignIn/> } />
        <Route path="signup" element={ <SignUp/> } />
        <Route path="contact" element={ <Contact/> } />
        <Route path="user-info" element={<UserInfo />} />
        <Route path="addvenue" element={<AddVenue />} />
        <Route path="ownerview" element={<OwnerView />} />
        <Route path="managevenue" element={<VenueDetails />} />
        <Route path="AddActivity" element={<AddActivity />} />
      </Routes>
    </div>
  );
}