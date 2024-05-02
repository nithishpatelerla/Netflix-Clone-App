import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import Cast from "./cast/Cast";
import Recommended from "./simmovies.js/Recommended";
import { FaPlay } from "react-icons/fa";
import bg from "../../Assets/logo.jpg";
import Logo from "../../Assets/logo2.png";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const { movieID } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=fff63bca0b4459d1f516e1a821056fb2&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, [movieID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const {
    id,
    original_title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    tagline,
  } = movie;

  const customStyles = {
    backgroundImage: backdrop_path
      ? `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`
      : bg,
  };
  return (
    <div className="md:mt-[5.5rem] mt-[69px]">
      <Outlet />

      <div
        style={customStyles}
        className="main-container w-[100%] bg-no-repeat  bg-cover mx-auto "
      >
        <div className=" flex items-center md:justify-evenly  mx-auto   bg-gray-800 opacity-[0.95] sm:flex-row flex-col  py-10  px-2 md:px-0  sm:justify-center">
          <div className="image-container md:ml-12 w-[98%] mx-auto sm:w-fit">
            <img
              className=" sm:w-[160px] max-w-[400px] mx-auto block  w-[50%]  md:w-[220px] lg:w-[300px]"
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                  : Logo
              }
              alt={original_title}
            />
          </div>
          <div className="details sm:ml-4  lg:px-24 py-0   mx-auto max-w-[400px] lg:max-w-none md:max-w-none md:ml-0 md:px-5 text-center sm:text-left px-2 ">
            <h2 className=" font-extrabold md:mb-10 md:mt-8 text-red-700 lg:text-6xl text-2xl mt-2 md:text-4xl ">
              {original_title}
            </h2>
            <p className="lg:text-3xl font-bold md:my-5 text-base my-2 md:text-xl ">
              <span>Release Date :</span> {release_date}
            </p>
            <p className="lg:text-4xl text-red-500 font-extrabold md:my-5 text-xl my-4 md:text-2xl">
              "{tagline ? tagline : "no tagline"}"
            </p>
            <p className="text-base font-bold  max-w-[450px] md:text-text-base lg:text-2xl lg:max-w-none">
              {overview}
            </p>
            <div className="button md:my-8 mb-8 mt-10">
              <Link
                to={`/moviedetails/${movieID}/trailer`}
                className="bg-red-700 hover:bg-red-500 active:bg-red-900 text-white text-center font-extrabold lg:text-xl lg:px-4 lg:py-2  rounded-sm  px-3 text-base md:text-base md:px-3 md:py-1 py-2"
              >
                <FaPlay className="inline-block sm:pb-[5px] pb-[2px]" /> Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Cast movie_ID={id} />
      <Recommended movie_ID={id} name="Recommendations" />
      <Recommended movie_ID={id} name="Similar" />
    </div>
  );
};

export default Movie;
