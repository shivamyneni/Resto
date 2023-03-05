import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function VenueDetails() {
    const { id }= useParams();
    // console.log(id)
    const navigate = useNavigate();
    const [venue, setVenue] = useState([])
    const [sports, setSports] = useState("")
    const [timeslots, setTimeslots] = useState("")
    useEffect(() => {
        axios.post(`/managevenue/${id}`).then(res => {
            // console.log(res.data['venue'])
            setVenue(res.data['venue'])
            setSports(res.data['venue']['sports'].join(', '))
            setTimeslots(res.data['venue']['timeslots'].join(', '))
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    }, [])

    // Example venue data - replace with your own data fetching code
    /*const venue = {
        id: 1,
        name: 'Garrett Fieldhouse',
        description: 'Nice little field',
        address: '1025 E 7th St, Bloomington, IN 47405',
        sports: ['Soccer', 'Tennis', 'Football', 'Baseball'],
        timeslots: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    };*/
    
    return (
        <div>
        <Header />
        <div className='m-4'>
            <h1 className='text-xl font-bold mb-2'>{venue.name}</h1>
            <p className='mb-4'>{venue.description}</p>
            <div className='mb-4'>
            <strong>Address: </strong>
            <span>{venue.address}</span>
            <span>{venue.info}</span>
            </div>
            <div className='mb-4'>
            <strong>Sports offered: </strong>
            <span>{sports}</span>
            </div>
            <div className='mb-4'>
            <strong>Available timeslots: </strong>
            <span>{timeslots}</span>
            </div>
            <button
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
            onClick={e => navigate('/AddActivity')}
            >
            Add Activity
            </button>
        </div>
        </div>
    );
}
