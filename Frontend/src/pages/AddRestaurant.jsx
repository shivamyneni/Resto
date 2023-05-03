import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const AddMovie = () => {
  const [formData, setFormData] = useState({
    name: "",
    directorname: "",
    description: "",
    cuisine: "",
    posterUrl: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //console.log(name);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);
    axios
      .post("/restaurants/add", {
        name: formData.name,
        description: formData.description,
        locationname: formData.location,
        cuisine: formData.cuisine.split(","),
        posterUrl: formData.posterUrl,
      })
      .then((res) => {
        console.log(res);
        navigate("/restaurants");
      })
      .catch((err) => {
        console.log(err);
      });
    // Do something with the form data
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 p-[50px] flex flex-col mx-auto"
      >
        <div className="mb-4">
          <h2 className="text-md text-start mb-[13px] mt-[25px] font-bold font-Pathway">
            Restaurant Name:
          </h2>
          <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
            <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
              <input
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                name="name"
                id="name"
                className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
                placeholder="Restaurant name"
              />
            </div>
          </div>
          <h2 className="text-md text-start mb-[13px] mt-[25px]  font-bold font-Pathway">
            Location:
          </h2>
          <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
            <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
              <input
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location name"
                className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
              />
            </div>
          </div>
          <h2 className="text-md text-start mb-[13px] mt-[25px]  font-bold font-Pathway">
            Description:
          </h2>
          <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
            <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
              <input
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
              />
            </div>
          </div>
          <h2 className="text-md text-start mb-[13px] mt-[25px]  font-bold font-Pathway">
            Cuisine:
          </h2>
          <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
            <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
              <input
                type="text"
                name="cuisine"
                id="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
                placeholder="Genre"
                className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
              />
            </div>
          </div>
          <h2 className="text-md text-start mb-[13px] mt-[25px]  font-bold font-Pathway">
            Poster Url:
          </h2>
          <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
            <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
              <input
                type="text"
                name="posterUrl"
                id="posterUrl"
                value={formData.posterUrl}
                onChange={handleInputChange}
                placeholder="Poster Url"
                className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-fit h-fit bg-[#2E8B57] text-white rounded-md px-[20px] py-[10px] font-bold font-Pathway"
        >
          Add Restaurant
        </button>
      </form>
      <div className="w-2/3 h-full bg-white flex items-center">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/21/16/02/outdoor-dining-1846137__480.jpg"
          className="w-full h-full "
        />
      </div>
    </div>
  );
};

export default AddMovie;
