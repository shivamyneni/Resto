import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import VenueCardCustomer from '../components/VenueCardCustomer';

export default function CustomerView() {
    const { query }= useParams();
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
                <h4><b> Customer View</b></h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' style={{width: '95vw'}}>
                {
                    venues.filter(value => {
                        return query == undefined || 
                        (value.name.toLowerCase().includes(query.toLowerCase()) ||
                        (value.info.toLowerCase().includes(query.toLowerCase())) ||
                        (value.address.toLowerCase().includes(query.toLowerCase())) ||
                        (value.sports.map(s=> s.toLowerCase()).includes(query.toLowerCase())) ||
                        (value.timeslots.map(i => i.toString().toLowerCase()).includes(query.toLowerCase())))
                    }).map(value => {
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





