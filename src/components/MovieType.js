import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Loading from "../Assets/loading.gif";
import { Link, useParams } from "react-router-dom";
import Logo from "../Assets/logo2.png";
const MovieType = () => {
  let { type } = useParams();
  const [movies, setMovies] = useState([]);
  const heading = type.replace("_", " ");
  const [query, setQuery] = useState(type.toLowerCase());

  const [pageNumber, setPageNumber] = useState(1);

  const [isLoading, setIsLoading] = useState();
  const [hasMOre, setHasMore] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  useEffect(() => {
    setQuery(type.toLowerCase());
    setPageNumber(1);
  }, [type]);

  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
  }, [query]);

  const reference = useRef();

  const lastMovieElement = useCallback(
    (node) => {
      if (isLoading) return;
      if (reference.current) reference.current.disconnect();
      reference.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMOre) {
          setPageNumber((previousPageNumber) => {
            return previousPageNumber + 1;
          });
        }
      });

      if (node) {
        reference.current.observe(node);
      }
    },
    [isLoading, hasMOre]
  );
  useEffect(() => {
    let cancel;

    setIsLoading(true);
    setError(false);

    const getMovies = async () => {
      try {
        const { data } = await axios({
          method: "Get",
          url: `https://api.themoviedb.org/3/movie/${query}?api_key=fff63bca0b4459d1f516e1a821056fb2&language=en-US&page=${pageNumber}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setMovies((previousMovies) => {
          return [...previousMovies, ...data.results];
        });
        setIsLoading(false);
        setHasMore(data.results.length > 0);
      } catch (error) {
        if (axios.isCancel(error)) return;

        console.log(error);
        setError(error);
      }
    };
    getMovies();

    return () => cancel();
  }, [query, pageNumber]);

  return (
    <div className="py-24">
      <h1 className="text-center my-9 font-bold  font-sans  lg:text-4xl text-[1.5rem]">
        {heading} Movies
      </h1>
      <div className=" flex flex-wrap items-center justify-around">
        {movies?.map(({ poster_path, id }, index) => {
          if (movies.length === index + 1) {
            return (
              <div
                ref={lastMovieElement}
                className="w-[10.6rem] sm:m-3 lg:m-4 sm:w-[23%] m-2 lg:w-[15%]
                hover:scale-110 hover:border-2 hover:border-white transition-all active:border-red-800 active:border-4"
                key={index}
              >
                <Link to={`/moviedetails/${id}`}>
                  <img
                    className="w-[100%] "
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : Logo
                    }
                    alt=""
                  />
                </Link>
              </div>
            );
          } else {
            return (
              <div
                className="w-[10.6rem] sm:m-3 lg:m-4 sm:w-[23%] m-2 lg:w-[15%]
                hover:scale-110 hover:border-2 hover:border-white transition-all active:border-red-800 active:border-4"
                key={index}
              >
                <Link to={`/moviedetails/${id}`}>
                  <img
                    className="w-[100%] "
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : Logo
                    }
                    alt=""
                  />
                </Link>
              </div>
            );
          }
        })}
      </div>
      {isLoading && (
        <img
          src={Loading}
          alt="loading..."
          className="w-24 mx-auto block my-10"
        />
      )}
      {error && (
        <div className="text-3xl text-center my-8 text-red-800 font-bold">
          {error.message}!
        </div>
      )}
    </div>
  );
};

export default MovieType;
