import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../../Assets/logo2.png";
const Person = () => {
  const { castID } = useParams();

  const [person, setPerson] = useState({});

  useEffect(() => {
    const getPerson = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${castID}?api_key=fff63bca0b4459d1f516e1a821056fb2&language=en-US`
        );
        setPerson(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPerson();
  }, [castID]);

  const customStyle = {
    backgroundImage:
      "url('https://thumbs.dreamstime.com/b/retro-film-production-accessories-still-life-placed-wooden-planks-concept-making-red-curtain-movie-screen-background-87870237.jpg')",
  };

  return (
    <div className="">
      <section
        className=" body-font mt-20 bg-no-repeat bg-cover w-[96%] mx-auto h-[100vh] lg:h-auto "
        style={customStyle}
      >
        <div className="container mx-auto flex max-w-none px-5 bg-gray-800 py-8 lg:flex-row flex-col items-center opacity-[0.8] h-[100vh] lg:h-auto w-[100%]">
          <div className="lg:max-w-lg lg:w-full  w-5/6  mb-0">
            <img
              className="object-cover object-center rounded max-w-none w-[60%] mx-auto"
              alt="hero"
              src={
                person?.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${person?.profile_path}`
                  : Logo
              }
            />
          </div>
          <div className="lg:flex-grow md:w-2/3 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center max-w-[280px] sm:max-w-none">
            <h1 className="title-font sm:text-5xl text-3xl mb-8  font-extrabold text-red-600">
              {person?.name}
            </h1>

            <p className="pb-8  font-semibold  text-base sm:text-xl ">
              {person?.biography?.slice(0, 300)}....
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Person;
