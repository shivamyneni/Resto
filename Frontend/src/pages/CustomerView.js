import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import VenueCardCustomer from '../components/VenueCardCustomer';

export default function CustomerView() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        axios.get('/viewvenues').then(res => {
            setVenues(res.data['allvenues']);
            if (res.data.error) {
                alert(res.data.error);
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }, []);

    return (
    <div>
        <Header />
        <div className='flex flex-col items-center justify-center m-4'>
            <div className='flex'>
                <h4 className='mx-96'><b> Customer View</b></h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' style={{width: '95vw'}}>
                {
                    venues.map(value => {
                    return (
                        <VenueCardCustomer
                        key={value._id}
                        id={value._id}
                        name={value.name}
                        description={value.info}
                        address={value.address}
                        sports={value.sports}
                        timeslots={value.timeslots}
                        />
                    );
                    })
                }
            </div>
        </div>
    </div>
    );
}





