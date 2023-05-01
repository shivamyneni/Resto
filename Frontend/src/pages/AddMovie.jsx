import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const AddMovie = () => {
  const [formData, setFormData] = useState({
    name: "",
    directorname: "",
    description: "",
    genre: "",
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
      .post("/movies/add", {
        name: formData.name,
        description: formData.description,
        genre: formData.genre.split(","),
        directorname: formData.directorname,
        posterUrl: formData.posterUrl,
      })
      .then((res) => {
        console.log(res);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
    // Do something with the form data
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="directorName"
          className="block text-gray-700 font-bold mb-2"
        >
          Director Name
        </label>
        <input
          type="text"
          name="directorname"
          id="directorname"
          value={formData.directorname}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">
          Genre
        </label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="posterUrl"
          className="block text-gray-700 font-bold mb-2"
        >
          Poster URL
        </label>
        <input
          type="text"
          name="posterUrl"
          id="posterUrl"
          value={formData.posterUrl}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save
      </button>
    </form>
  );
};

export default AddMovie;
