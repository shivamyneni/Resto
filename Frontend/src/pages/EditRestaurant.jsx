import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import check from "../images/check.png";
import edit from "../images/edit.png";
import QueryOne from "./QueryOne";

const EditRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    locationname: "",
    description: "",
    cuisine: [""],
    posterUrl: "",
  });

  const [editMode, setEditMode] = useState("");

  const EditFunctionComponent = (name) => {
    console.log(name);
    return (
      <div className="bg-white">
        {editMode == name.name ? (
          <div
            className="w-full h-full"
            onClick={() => {
              console.log("check clicked");
              setEditMode("");
            }}
          >
            <img className="w-[20px] h-[20px] ml-[8px]" src={check} />
          </div>
        ) : (
          <div
            className="w-full h-full"
            onClick={() => {
              console.log("edit clicked");
              setEditMode(name.name);
            }}
          >
            <img className="w-[20px] h-[20px] ml-[8px]" src={edit} />
          </div>
        )}
      </div>
    );
  };

  const locationname = useLocation();

  React.useEffect(() => {
    console.log(locationname.state);
    setFormData({
      name: locationname.state.name,
      locationname: locationname.state.locationname,
      description: locationname.state.description,

      cuisine: locationname.state.cuisine + ",",

      posterUrl: locationname.state.posterUrl,
    });
  }, [locationname]);

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
      .post("/restaurants/update", {
        name: formData.name,
        description: formData.description,
        locationname: formData.locationname,
        cuisine: [...formData.cuisine.split(",")],
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
      <form className="w-1/3 p-[50px] flex flex-col mx-auto">
        <div className="mb-4 w-full ">
          <h2 className="text-md text-start mb-[13px] mt-[25px] font-bold font-Pathway">
            Restaurant Name:
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
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  className="w-full rounded-md text-sm pl-[4px] focus:outline-none font-Poppins rounded-r-none disabled:bg-gray-100 disabled:cursor-not-allowed "
                  placeholder="Movie name"
                />
              </div>
            </div>
            {/* <EditFunctionComponent name="name" /> */}
          </div>
          <h2 className="text-md text-start mb-[13px] mt-[25px]  font-bold font-Pathway">
            Location:
          </h2>
          <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
            <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
              <input
                name="locationname"
                id="locationname"
                value={formData.locationname}
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
          onClick={handleSubmit}
          className="w-fit h-fit bg-[#2E8B57] text-white rounded-md px-[20px] py-[10px] font-bold font-Pathway"
        >
          Update Restaurant
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

export default EditRestaurant;
