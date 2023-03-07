import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';

export default function ActivityCard(props) {
    const name = props.name;
    const availability = props.availability;
    const timeslot = props.timeslot;

    return (
        <Card className='m-2 hover:cursor-pointer'>
            <CardContent>
                <Typography>Name: {name}</Typography>
                <Typography className='mt-1'>Timeslot: {timeslot}</Typography>
                <Typography className='mt-1'>Availability: {availability}</Typography>
            </CardContent>
        </Card>
    );
}