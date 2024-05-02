import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "../../../Assets/logo2.png";
import Image from "../../Image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Recommended = ({ movie_ID, name }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getCast = async () => {
      try {
        if (movie_ID) {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie_ID}/${name.toLowerCase()}?api_key=${
              process.env.REACT_APP_TMDB_API_KEY
            }&language=en-US&page=1`
          );
          setMovies(data.results);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getCast();
  }, [movie_ID, name]);

  return movies.length > 10 ? (
    <div>
      <div className="mb-6">
        <h1 className="sm:ml-14 ml-5  my-8  font-bold lg:text-4xl text-[1.5rem]">
          {name}
        </h1>
        <div className=" sm:px-8">
          <Slider {...settings}>
            {movies?.map((movie) => {
              return (
                <div key={movie?.id}>
                  <Link to={`/moviedetails/${movie?.id}`}>
                    <Image
                      imgUrl={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                          : Logo
                      }
                    />
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  ) : null;
};

export default Recommended;
