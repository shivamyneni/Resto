import { Card, CardContent, Typography } from '@material-ui/core';

export default function VenueCard(props) {
    const name = props.name;
    const description = props.description;
    const address = props.address;
    const sports = props.sports.join(', ');
    const timeslots = props.timeslots.join(', ');

    return (
        <Card className='w-1/3 m-2'>
            <CardContent>
                <Typography>Name: {name}</Typography>
                <Typography>Description: {description}</Typography>
                <Typography>Address: {address}</Typography>
                <Typography className='mt-1'>Sports:</Typography>
                <Typography>{sports}</Typography>
                <Typography className='mt-1'>Time Slots:</Typography>
                <Typography>{timeslots}</Typography>
            </CardContent>
        </Card>
    );
}