import React from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DeleteRestaurant = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState({
    restaurantname: "",
    locationname: "",
    userid: "",
  });
  return (
    <div className="flex flex-col items-center">
      <div className="w-screen h-screen flex flex-row items-center justify-center">
        <div className="w-1/3 p-[50px] flex flex-col mx-auto">
          <div className="mb-4">
            <h2 className="text-md text-start mb-[13px] mt-[25px] text-[#2E8B57] font-bold font-Pathway">
              Restaurant Name:
            </h2>
            <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
              <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
                <input
                  value={value.restaurantname}
                  onChange={(e) =>
                    setValue((prevValue) => ({
                      ...prevValue,
                      restaurantname: e.target.value,
                    }))
                  }
                  type="text"
                  name="name"
                  id="name"
                  className="w-full rounded-md text-sm pl-[4px] text-[#2E8B57] focus:outline-none font-Poppins rounded-r-none"
                  placeholder="Restaurant name"
                />
              </div>
            </div>
            <h2 className="text-md text-start mb-[13px] mt-[25px] text-[#2E8B57]  font-bold font-Pathway">
              Location:
            </h2>
            <div className="flex shadow-lg rounded-md h-[40px] space-x-4 bg-white border-2 border-[#2E8B57]">
              <div className="flex flex-row items-center justify-center rounded-md bg-white border-[#2E8B57]  overflow-hidden w-full">
                <input
                  name="location"
                  id="location"
                  value={value.locationname}
                  onChange={(e) =>
                    setValue((prevValue) => ({
                      ...prevValue,
                      locationname: e.target.value,
                    }))
                  }
                  placeholder="Location name"
                  className="w-full rounded-md text-sm pl-[4px] focus:outline-none text-[#2E8B57] font-Poppins rounded-r-none"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              console.log(value.restaurantname, value.locationname);
              axios
                .delete(`/restaurants/delete/`, {
                  data: {
                    name: value.restaurantname,
                    locationname: value.locationname,
                    userid: getAuth().currentUser.uid,
                  },
                })
                .then((res) => {
                  console.log(res);
                  navigate("/restaurants");
                });
            }}
            className="w-fit h-fit bg-[#2E8B57] text-white rounded-md  px-[20px] py-[10px] font-bold font-Pathway"
          >
            Delete Restaurant
          </button>
        </div>
        <div className="w-2/3 h-full bg-white flex items-center">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            className="w-full h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteRestaurant;
