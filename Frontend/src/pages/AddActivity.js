import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddActivity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availability, setavailability] = useState('');
  const [activityName, setActivityName] = useState('');
  const [venue, setVenue] = useState('');
  const [timing, setTiming] = useState('');

  const handleActivityNameChange = (event) => {
    setActivityName(event.target.value);
  };

  const handleavailabilityNameChange = (event) => {
    setavailability(event.target.value);
  };

  const handleVenueChange = (event) => {
    setVenue(event.target.value);
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("/addactivity",{
        name: activityName,
        venueid: id,
        timeslot: timing,
        availability: availability
    }).then(res => {
        console.log(res)
        if (res.data.error){
            alert(res.data.error)
        } else {
            navigate(`/managevenue/${id}`)
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Add Activity</h1>
      <form onSubmit={handleSubmit} className="w-2/3 flex flex-col items-center">
        <div className="mb-6">
          <label htmlFor='activity-name' className="block text-gray-700 font-bold mb-2">Activity Name:</label>
          <input
            id='activity-name'
            type='text'
            value={activityName}
            onChange={handleActivityNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Venue:</label>
          <input
            id='venue' 
            type='text' 
            value={venue} 
            onChange={handleVenueChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div> */}
        <div className="mb-6">
          <label className='block text-gray-700 font-bold mb-2'>Timing:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='timing'
            type="text"
            value={timing}
            onChange={handleTimingChange}
          />
        </div>
        <div className="mb-6">
          <label className='block text-gray-700 font-bold mb-2'>availability:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='availability'
            type="text"
            value={availability}
            onChange={handleavailabilityNameChange}
          />
        </div>
        <button className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
      </form>
    </div>
  );
}