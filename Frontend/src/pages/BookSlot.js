import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import Header from '../components/Header';


export default function BookSlot() {
  const { venueid,activityid } = useParams();
  console.log(activityid)
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(0);
  const [venueName,setVenueName] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityInfo, setActivityInfo] = useState("");
  const [timeslot, setTimeslot] = useState("")
  const [availability, setAvailability] = useState(0)

  const [court, setCourt] = useState('');
  const [availableSports, setAvailableSports] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleTimeChange = (event) => {
    setSelectedTime(parseInt(event.target.value));
  };

  const handleCourtChange = (event) => {
    setCourt(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user){
    axios.post("/stripe/payment-checkout",{venueName,venueid,activityid,time:timeslot,uid: user.uid}).then((res)=>{
      if(res.data.url){
        window.location.href = res.data.url;
      }
    })
    .catch((err)=>console.log(err.message));}
    else{
      navigate("/signin")
    }
  };

  useEffect(() => {
    axios.get(`/venues/${venueid}/`).then(res => {
      setVenueName(res.data['venue'][0]['name'])
      setAvailableSports(res.data['venue'][0]['sports'])
      setTimeslots(res.data['venue'][0]['timeslots'])
      if (res.data.error) {
        alert(res.data.error)
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    axios.get(`/venues/${venueid}/activities/${activityid}`).then(res =>{
      console.log(res.data['activity']);
      setActivityName(res.data['activity'][0]['name']);
      setActivityInfo(res.data['activity'][0]['info']);
      setAvailability(res.data['activity'][0]['availability']);
      setTimeslot(res.data['activity'][0]['timeslot']);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });


}, [venueid])

  return (
    <div>
    <Header />
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-8">Book Slot</h1>
      <div className='m-4'>
              <div className='mb-4'>
                  <strong>Activity: </strong>
                  <span>{activityName}</span>
              </div>
              <div className='mb-4'>
                  <strong>Description: </strong>
                  <span>{activityInfo}</span>
              </div>
              <div className='mb-4'>
                <strong>Availability: </strong>
                <span>{availability}</span>
              </div>
              <div className='mb-4'>
                <strong>Timeslot: </strong>
                <span>{timeslot}</span>
              </div>
      </div>
      <form onSubmit={handleSubmit} className="w-2/3 flex flex-col items-center">
        <div className="mb-6">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Confirm Booking
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}