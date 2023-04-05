import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button} from '@material-ui/core';

export default function ActivityCard(props) {
    const venueId = props.venueId
    const activityId = props.activityId
    const name = props.name;
    const access = props.access;
    const availability = props.availability;
    const timeslot = props.timeslot;
    const navigate = useNavigate();

    return (
        <Card className='m-2 hover:cursor-pointer'>
            <CardContent>
                <Typography>Name: {name}</Typography>
                <Typography className='mt-1'>Timeslot: {timeslot}</Typography>
                <Typography className='mt-1'>Availability: {availability}</Typography>
                <Typography>
                    {access === "user" &&
                    <button 
                        className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                        onClick={e => navigate(`/uservenues/${venueId}/useractivities/bookslot/${activityId}`)}>Book Slot
                    </button>
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}