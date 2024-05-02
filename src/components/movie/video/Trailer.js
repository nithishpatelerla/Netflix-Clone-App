import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Trailer.css";

const Trailer = () => {
  const [trailer, setTrailer] = useState([]);
  const { movieID } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=fff63bca0b4459d1f516e1a821056fb2&language=en-US`
        );
        const video = data?.results?.find((video) => {
          return (
            video?.type === "Trailer" &&
            video?.official &&
            video.site === "YouTube"
          );
        });

        setTrailer(video?.key);
      } catch (error) {
        console.log(error.message);
      }
    };
    getVideo();
  }, [movieID]);

  return trailer ? (
    <div>
      <div className=" iframe-container">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ) : (
    <h1 className="my-32 text-2xl text-center text-red-500">
      Sorry ! Trailer is not available
    </h1>
  );
};

export default Trailer;
