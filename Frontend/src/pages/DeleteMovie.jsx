import React from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
const DeleteMovie = () => {
  const [value, setValue] = React.useState({
    moviename: "",
    directorname: "",
    userid: "",
  });
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="movieName" className="text-lg font-medium mb-2">
        Enter the movie name:
      </label>
      <input
        type="text"
        id="moviename"
        value={value.moviename}
        onChange={(e) =>
          setValue((prevValue) => ({ ...prevValue, moviename: e.target.value }))
        }
        placeholder="Movie name"
        className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm mb-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <label htmlFor="movieName" className="text-lg font-medium mb-2">
        Enter the director name:
      </label>
      <input
        type="text"
        id="directorname"
        value={value.directorname}
        onChange={(e) =>
          setValue((prevValue) => ({
            ...prevValue,
            directorname: e.target.value,
          }))
        }
        placeholder="Movie name"
        className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm mb-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        onClick={() => {
          console.log(value.moviename, value.directorname);
          axios
            .delete(`/movies/delete/`, {
              data: {
                name: value.moviename,
                directorname: value.directorname,
                userid: getAuth().currentUser.uid,
              },
            })
            .then((res) => {
              console.log(res);
            });
        }}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteMovie;
