import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const AboutUsPage = () => {
  return (
    <div>
        <div>
            <Header />
        </div>
        <div className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to SimplyBook</h1>
          <p className="mt-4 text-xl text-gray-600">
            The ultimate destination for anyone looking to book an event center or venue for any kind of sport or event.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Venue</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We understand that finding the right venue can be a daunting task, whether you're a professional athlete, a recreational player, or someone who simply enjoys staying active. That's why we've created a user-friendly platform that connects you with a wide range of event centers and venues in your area, no matter what kind of sport or activity you're interested in.
            </p>
            <p className="text-gray-600 leading-relaxed">
              SimplyBook features a comprehensive database of event centers and venues, including sports complexes, community centers, schools, and more. Whether you're looking for a basketball court, a soccer field, a swimming pool, or any other kind of facility, we've got you covered.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Next Adventure</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our search and booking process is easy and intuitive. Simply enter your location and the type of sport or event you're interested in, and our platform will provide you with a list of available venues in your area. You can then compare prices, amenities, and other important details, and book the venue that best fits your needs and budget.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We also offer a range of additional services to make your experience even more enjoyable and convenient. These include online payments, scheduling tools, and customer support from our friendly and knowledgeable team.
            </p>
          </div>
        </div>
        <div className="text-center mt-16">
          <a href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">Login</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUsPage;
