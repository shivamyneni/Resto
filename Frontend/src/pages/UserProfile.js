import { Button } from '@mui/material';
import React, { useState } from 'react';
import Header from "../components/Header"

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const editHandler=(e)=>{
    
  }

  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-8">
        <div className="w-full md:w-1/2 mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg px-10 py-8">
            <h1 className="text-2xl font-bold mb-8">User Profile</h1>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                    Phone:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                    City:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="contained" onClick={editHandler} className="px-8 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                  Edit Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='m-2 flex'>
        <text className='flex-start '>Bookings History</text>
      </div>
    </div>
  );
}

export default UserProfile;
