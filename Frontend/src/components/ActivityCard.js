import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import axios from 'axios';

export default function ActivityCard(props) {
  const venueId = props.venueId;
  const id = props.id;
  const name = props.name;
  const access = props.access;
  const availability = props.availability;
  const timeslot = props.timeslot;
  const [rating, setRating] = useState(0); // State for rating
  const navigate = useNavigate();

  const handleRemove = (e) => {
    e.preventDefault();
    axios
      .delete(`/venues/${venueId}/activities/delete/${id}`)
      .then((response) => {
        // handle success
        props.reload();
      })
      .catch((error) => {
        // handle error
        console.log(error.response.data.error);
      });
  };

  return (
    <Card className='m-2 hover:cursor-pointer'>
      {access === 'owner' ? (
        <Button
          onClick={handleRemove}
          className=' m-2 bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto'
        >
          Remove
        </Button>
      ) : (
        <></>
      )}
      <CardContent>
        <Typography variant='h6'>Name: {name}</Typography>
        <Typography className='mt-1'>Timeslot: {timeslot}</Typography>
        <Typography className='mt-1'>Availability: {availability}</Typography>
        <div className='mt-3'>
          {access === 'user' && (
            <>
              <Typography>Rate Activity:</Typography>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                className='text-white font-bold py-2 px-4 rounded bg-purple-600 hover:bg-purple-700 '
                onClick={(e) =>
                  navigate(
                    `/uservenues/${venueId}/useractivities/bookslot/${id}`
                  )
                }
              >
                Book Slot
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, Typography, Button } from '@material-ui/core';
// import axios from 'axios';

// export default function ActivityCard(props) {
//   const venueId = props.venueId;
//   const id = props.id;
//   const name = props.name;
//   const access = props.access;
//   const availability = props.availability;
//   const timeslot = props.timeslot;
//   const [rating, setRating] = useState(0); // State for rating
//   const navigate = useNavigate();

//   const handleRemove = (e) => {
//     e.preventDefault();
//     axios
//       .delete(`/venues/${venueId}/activities/delete/${id}`)
//       .then((response) => {
//         // handle success
//         props.reload();
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error.response.data.error);
//       });
//   };

//   const handleRating = (rating) => {
//     // Send rating to backend along with user's ID
//     const userId = props.userId; // User ID obtained from props
//     axios
//       .post(`/venues/${venueId}/activities/${id}/rating`, { rating, userId })
//       .then((response) => {
//         // handle success
//         console.log('Rating submitted successfully');
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error.response.data.error);
//       });
//   };

//   return (
//     <Card className='m-2 hover:cursor-pointer'>
//       {access === 'owner' ? (
//         <Button
//           onClick={handleRemove}
//           className=' m-2 bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto'
//         >
//           Remove
//         </Button>
//       ) : (
//         <></>
//       )}
//       <CardContent>
//         <Typography variant='h6'>Name: {name}</Typography>
//         <Typography className='mt-1'>Timeslot: {timeslot}</Typography>
//         <Typography className='mt-1'>Availability: {availability}</Typography>
//         <div className='mt-3'>
//           {access === 'user' && (
//             <>
//               <Typography>Rate Activity:</Typography>
//               <div>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     className={`text-xl ${
//                       star <= rating ? 'text-yellow-400' : 'text-gray-400'
//                     }`}
//                     onClick={() => setRating(star)}
//                   >
//                     ★
//                   </button>
//                 ))}
//               </div>
//               <Button
//                 className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2'
//                 onClick={(e) =>
//                   handleRating(rating)
//                 }
//               >
//                 Submit Rating
//               </Button>
//               <Button
//                 className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2'
//                 onClick={(e) =>
//                   navigate(
//                     `/uservenues/${venueId}/useractivities/bookslot/${id}`
//                   )
//                 }
//               >
//                 Book Slot
//               </Button>
//             </>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
