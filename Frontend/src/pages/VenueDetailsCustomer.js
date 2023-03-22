// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import ActivityCard from '../components/ActivityCard';

// export default function VenueDetailsCustomer() {
//   const { id }= useParams();
//   const navigate = useNavigate();
//   const [venue, setVenue] = useState([])
//   const [sports, setSports] = useState("")
//   const [timeslots, setTimeslots] = useState("")
//   const [activities, setActivities] = useState([])
  
//   useEffect(() => {
//     axios.post(`/managevenue/${id}`).then(res => {
//       setVenue(res.data['venue'])
//       setSports(res.data['venue']['sports'].join(', '))
//       setTimeslots(res.data['venue']['timeslots'].join(', '))
//       if (res.data.error) {
//         alert(res.data.error)
//       }
//     }).catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//     axios.post('/venueactivities', {
//       venueid: id
//     }).then(res => {
//       console.log(res.data['activities'])
//       setActivities(res.data['activities'])
//       if (res.data.error) {
//         alert(res.data.error)
//       }
//     }).catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//   }, [])

//   return (
//     <div>
//       <Header />
//       <div className='m-4'>
//         <h1 className='text-xl font-bold mb-2'>{venue.name}</h1>
//         <p className='mb-4'>{venue.info}</p>
//         <div className='mb-4'>
//           <strong>Address: </strong>
//           <span>{venue.address}</span>
//         </div>
//         <div className='mb-4'>
//           <strong>Sports offered: </strong>
//           <span>{sports}</span>
//         </div>
//         <div className='mb-4'>
//           <strong>Available timeslots: </strong>
//           <span>{timeslots}</span>
//         </div>
//         <button 
//           className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
//           onClick={e => navigate(`/BookSlot/${id}`)}>Book a Slot
//         </button>
//       </div>
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
//         {
//           activities.map(value => {
//             return (
//               <ActivityCard key={value._id} id={value._id} name={value.name} timeslot={value.timeslot} availability={value.availability}/>
//             )
//           })
//         }
//       </div>
//     </div>
//   );
// }

import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActivityCard from '../components/ActivityCard';

export default function VenueCustomerDetails() {
    const { id }= useParams();
    // console.log(id)
    const navigate = useNavigate();
    const [venue, setVenue] = useState([])
    const [sports, setSports] = useState("")
    const [timeslots, setTimeslots] = useState("")
    const [activities, setActivities] = useState([])
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
        });
        axios.post('/venueactivities', {
            venueid: id
        }).then(res => {
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
            <p className='mb-4'>{venue.info}</p>
            <div className='mb-4'>
                <strong>Address: </strong>
                <span>{venue.address}</span>
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
                    onClick={e => navigate(`/BookSlot/${id}`)}>Book Slot
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
                {
                    activities.map(value => {
                        return (
                            <ActivityCard key={value._id} id={value._id} name={value.name} timeslot={value.timeslot} availability={value.availability}/>
                        )
                    })
                }
            </div>
        </div>
    );
}
