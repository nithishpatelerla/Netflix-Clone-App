import axios from "axios";
import React, { useEffect, useState } from "react";
import bg from "../../Assets/logo.jpg";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const index = Math.floor(Math.random() * 20);

const Header = () => {
  const [movie, setMovie] = useState({});
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&without_keywords=comedy&with_watch_monetization_types=flatrate`
        );
        setMovie(response.data.results[index]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovies();
  }, []);

  const customStyles = {
    backgroundImage: movie?.backdrop_path
      ? `url(https://image.tmdb.org/t/p/w500/${movie?.backdrop_path})`
      : `url(${bg})`,
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="w-[90%]  mx-auto mt-[69px] sm:mt-32">
      <div
        className="header bg-no-repeat bg-cover w-[100%] mx-auto"
        style={customStyles}
      >
        <div
          className="m-auto text-left   pt-7 pb-14  w-[100%] h-[95%]  px-3 bg-gray-900 box-border
        opacity-[0.95] sm:py-24 "
        >
          <div className="sm:ml-20">
            <h1 className=" text-red-600 font-extrabold text-[2rem] sm:text-[3rem] lg:text-[5rem]">
              Welcome to Netflix
            </h1>
            <p className=" font-semibold my-7  sm:w-[80%] text-base sm:text-[1.4rem] lg:text-2xl">
              Watch world's most popular movies of all genres . Search the movie
              you want . Get all the details of the movie you want .
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="sm:w-[80%] w-[100%] flex items-center  sm:mt-10 mt-8 sm:ml-20"
          >
            <input
              type="text"
              placeholder="Search"
              className="   w-[70%] rounded-2xl outline-none text-black px-3 py-1 lg:py-2 lg:rounded-3xl "
              onChange={handleChange}
              value={query}
              name="query"
            />
            <button
              type="submit"
              className="w-[53.516px]    font-bold bg-red-600 rounded-2xl -ml-6 py-1 lg:py-2 lg:rounded-3xl lg:-ml-10 hover:bg-red-400 active:bg-red-800"
            >
              <FaSearch className="inline mx-1 mb-[4px] " />{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
