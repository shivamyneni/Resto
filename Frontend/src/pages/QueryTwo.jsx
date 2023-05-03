import React from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { useState } from "react";
import check from "../images/check.png";
import edit from "../images/edit.png";
import RestaurantCard from "../components/RestaurantCard";
const QueryTwo = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const [formData, setFormData] = useState({
    name: "",
    rating: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .get(`/restaurants/query2/${formData.name}/${formData.rating}`)
      .then((res) => {
        console.log("these are the details");
        console.log(res.data);
        setData(res.data);
        //navigate("/restaurants");
      });
    // axios
    //   .post("/restaurants/update", {
    //     name: formData.name,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     //navigate("/restaurants");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // Do something with the form data
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <div className="w-1/3 p-[50px] flex flex-col mx-auto">
        <div className="mb-4 w-full ">
          <h2 className="text-md text-start mb-[13px] mt-[25px] font-bold font-Pathway">
            Find all restaurants rated by a particular user with a rating
            greater than a particular value:
          </h2>
          <h2 className="text-md text-start mb-[13px] mt-[25px] font-bold font-Pathway">
            Username:
          </h2>

          <div className="flex flex-row items-center w-full bg-white">
            <div
              className={
                "flex shadow-lg rounded-md h-[40px] space-x-4 w-[100%]  border-2 border-[#2E8B57]"
              }
            >
              <div
                className={`flex flex-row items-center justify-center rounded-md  border-[#2E8B57]  overflow-hidden w-full 
                
                `}
              >
                <input
                  value={formData.name}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setFormData({ name: event.target.value });
                  }}
                  type="text"
                  name="name"
                  id="name"
                  className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none disabled:bg-gray-100 disabled:cursor-not-allowed "
                  placeholder="Username"
                />
              </div>
            </div>
          </div>
          <h2 className="text-md text-start mb-[13px] mt-[25px] font-bold font-Pathway">
            Rating:
          </h2>

          <div className="flex flex-row items-center w-full bg-white">
            <div
              className={
                "flex shadow-lg rounded-md h-[40px] space-x-4 w-[100%]  border-2 border-[#2E8B57]"
              }
            >
              <div
                className={`flex flex-row items-center justify-center rounded-md  border-[#2E8B57]  overflow-hidden w-full 
                
                `}
              >
                <input
                  value={formData.rating}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setFormData({ ...formData, rating: event.target.value });
                  }}
                  type="text"
                  name="name"
                  id="name"
                  className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none disabled:bg-gray-100 disabled:cursor-not-allowed "
                  placeholder="Rating"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-fit h-fit bg-[#2E8B57] text-white rounded-md px-[20px] py-[10px] font-bold font-Pathway"
        >
          Submit
        </button>
      </div>
      <div className="w-2/3 h-full bg-gray-100 flex flex-col  items-center">
        {data?.map((item, index) => (
          <RestaurantCard
            restaurant={item}
            key={index}
            // refetch={() => getWatchlist()}
          />
        ))}
        {/* <img
          src="https://cdn.pixabay.com/photo/2016/11/21/16/02/outdoor-dining-1846137__480.jpg"
          className="w-full h-full "
        /> */}
      </div>
    </div>
  );
};

export default QueryTwo;
