import React from 'react';

const Card = ({ title, description, time }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-3 w-100px">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500 my-2">{description}</p>
      <div className="flex items-center justify-between">
        <p className="text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default Card;
