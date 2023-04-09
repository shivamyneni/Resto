import React from 'react';

const Card = ({ venueName, activityName, bookedDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-3 w-100px">
      <h2 className="text-lg font-semibold">{venueName}</h2>
      <p className="text-gray-500 my-2">{activityName}</p>
      <p className="text-gray-500">{bookedDate.slice(0,10)}</p>
      {/* <div className="flex items-center justify-between">
        <p className="text-gray-500">{bookedDate}</p>
      </div> */}
    </div>
  );
};

export default Card;
