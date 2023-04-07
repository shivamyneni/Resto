import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActivityCard from '../components/ActivityCard';

export default function VenueDetails() {
    const { id }= useParams();
    // console.log(id)
    const navigate = useNavigate();
    const [venue, setVenue] = useState([])
    const [address, setAddress]=useState([])
    const [info, setInfo] = useState("")
    const [sports, setSports] = useState("")
    const [timeslots, setTimeslots] = useState("")
    const [activities, setActivities] = useState([])
    
    useEffect(() => {
        axios.get(`/venues/${id}/`).then(res => {
            setVenue(res.data['venue'][0]['name'])
            setAddress(res.data['venue'][0]['address'])
            setInfo(res.data['venue'][0]['info'])
            setSports(res.data['venue'][0]['sports'].join(', '))
            setTimeslots(res.data['venue'][0]['timeslots'].join(', '))
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        axios.get(`/venues/${id}/activities`, {
            venueid: id
        }).then(res => {
            console.log(res.data);
            console.log(res.data['activities'])
            setActivities(res.data['activities'])
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }, [])
    
    return (
        <div>
        <Header />
        <div className='m-4'>
            <h1 className='text-xl font-bold mb-2'>{venue.name}</h1>
            <div className='mb-4'>
                <strong>Venue: </strong>
                <span>{venue}</span>
            </div>
            <div className='mb-4'>
                <strong>Description: </strong>
                <span>{info}</span>
            </div>
            <div className='mb-4'>
                <strong>Address: </strong>
                <span>{address}</span>
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
                    onClick={e => navigate(`/venues/${id}/activities/addActivity`)}>Add Activity
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
                {
                    activities.map(value => {
                        return (
                            <ActivityCard access="owner" key={value._id} id={value._id} name={value.name} timeslot={value.timeslot} availability={value.availability}/>
                        )
                    })
                }
            </div>
        </div>
    );
}