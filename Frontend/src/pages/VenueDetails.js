import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function VenueDetails() {
  const { venueId } = useParams();
  const navigate = useNavigate();

  // Example venue data - replace with your own data fetching code
  const venue = {
    id: 1,
    name: 'Garrett Fieldhouse',
    description: 'Nice little field',
    address: '1025 E 7th St, Bloomington, IN 47405',
    sports: ['Soccer', 'Tennis', 'Football', 'Baseball'],
    timeslots: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  };

  const handleAddActivity = () => {
    navigate('/AddActivity');
  };

  return (
    <div>
      <Header />
      <div className='m-4'>
        <h1 className='text-xl font-bold mb-2'>{venue.name}</h1>
        <p className='mb-4'>{venue.description}</p>
        <div className='mb-4'>
          <strong>Address: </strong>
          <span>{venue.address}</span>
        </div>
        <div className='mb-4'>
          <strong>Sports offered: </strong>
          <span>{venue.sports.join(', ')}</span>
        </div>
        <div className='mb-4'>
          <strong>Available timeslots: </strong>
          <span>{venue.timeslots.join(', ')}</span>
        </div>
        <button
          className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddActivity}
        >
          Add Activity
        </button>
      </div>
    </div>
  );
}
