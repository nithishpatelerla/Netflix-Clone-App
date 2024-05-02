import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Row from "./Row";

const Movies = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=fff63bca0b4459d1f516e1a821056fb2&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGenre();
  }, []);

  return (
    <div>
      <Header />
      <div className=" sm:py-10 pt-6 pb-10">
        {genres?.map((genre) => {
          return <Row key={genre?.id} id={genre?.id} genreName={genre?.name} />;
        })}
      </div>
    </div>
  );
};

export default Movies;
