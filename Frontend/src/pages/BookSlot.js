import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from "firebase/auth";

export default function BookSlot() {
  const { venueid, activityid } = useParams();
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(0);
  const [venueName, setVenueName] = useState("");
  const [court, setCourt] = useState('');
  const [availableSports, setAvailableSports] = useState([]);
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
    if (user) {
      axios.post("/stripe/payment-checkout", { venueName, venueid, activityid, time: selectedTime, court, uid: user.uid }).then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
        .catch((err) => console.log(err.message));
    } else {
      navigate("/signin")
    }
  };

  useEffect(() => {
    axios.get(`/venues/${venueid}/`).then(res => {
      setVenueName(res.data['venue'][0]['name'])
      setAvailableSports(res.data['venue'][0]['sports'])
      if (res.data.error) {
        alert(res.data.error)
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }, [venueid])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Book Slot</h1>
      <form onSubmit={handleSubmit} className="w-2/3 flex flex-col items-center">
        <div className="mb-6">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time:</label>
          <select
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {[...Array(24)].map((_, index) => (
              <option value={index} key={index}>
                {index}:00 - {index + 1}:00
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="court" className="block text-gray-700 font-bold mb-2">Court:</label>
          <select
            id="court"
            value={court}
            onChange={handleCourtChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Court</option>
            {availableSports.map((sport, index) => (
              <option value={sport} key={index}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Confirm Booking
           </button>
         </div>
       </form>
      </div>
   );
}