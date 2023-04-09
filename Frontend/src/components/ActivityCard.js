import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button} from '@material-ui/core';
import axios from 'axios';
export default function ActivityCard(props) {
    const venueId = props.venueId
    const id = props.id
    const name = props.name;
    const access = props.access;
    const availability = props.availability;
    const timeslot = props.timeslot;
    const info = props.info;
    const navigate = useNavigate();

    const handleRemove=(e)=>{
        e.preventDefault();
        axios.delete(`/venues/${venueId}/activities/delete/${id}`)
        .then(response => {
            // handle success
            props.reload()
        })
        .catch(error => {
            // handle error
            console.log(error.response.data.error);
        });
    }

    return (
        <Card className='m-2 hover:cursor-pointer'>
            {access === "owner" ? (
                <button onClick={handleRemove} className=' m-2 bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto'>
                Remove
                </button>
            ) : (
                <></>
            )}
            <CardContent>
                <Typography>Name: {name}</Typography>
                <Typography>Info: {info}</Typography>
                <Typography className='mt-1'>Timeslot: {timeslot}</Typography>
                <Typography className='mt-1'>Availability: {availability}</Typography>
                <Typography>
                {access === "user" && (
                    <button
                    className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                    onClick={e =>
                        navigate(
                        `/uservenues/${venueId}/useractivities/bookslot/${id}`
                        )
                    }>
                    Book Slot
                    </button>
                )}
                </Typography>
            </CardContent>
</Card>

    );
}