import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from "../components/HistoryCard";
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [bookings,setBookings] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const bookedDates = [new Date('04-01-2023'), new Date('04-02-2023'), new Date('04-05-2023')];

  const tileDisabled = ({ date, view }) =>
    view === 'month' && bookedDates.some(bookedDate => bookedDate.getTime() === date.getTime());

  const tileClassName = ({ date }) =>
    bookedDates.some(bookedDate => bookedDate.getTime() === date.getTime()) ? 'bg-red-500' : null;

    useEffect(() => {
      axios.get(`/bookings/${user?.uid}/`).then(res => {
          console.log(res.data.bookings);
          if (res.data.error) {
              alert(res.data.error)
          }
          else{
            setBookings(res.data.bookings)
          }
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
    },[user]);
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
                    onChange={event => setName(event.target.value) }
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
                    onChange={event => setEmail(event.target.value) }
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
                    onChange={event => setPhone(event.target.value) }
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
                    onChange={event => setCity(event.target.value) }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="contained" className="px-8 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick={(e)=>{ }}>
                  Edit Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='m-2 flex'>
      <Calendar className="ml-5 flex-start" tileDisabled={tileDisabled} tileClassName={tileClassName} />
      <style jsx>{`
        .booked {
          background-color: #f56565;
          color: #fff;
        }
      `}</style>
      <div className='flex'>
        {
          bookings.map((item)=>
            <Card
            title={item.venueName}
            description={item.court}
            time={item.time}
          />
          )
        }
      </div>
      </div>
    </div>
  );
}

export default UserProfile;
