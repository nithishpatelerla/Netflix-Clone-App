import React from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

const Sidebar = ({ visibility, setVisibility }) => {
  const handleClick = () => {
    setVisibility(!visibility);
  };
  return (
    <div className="fixed py-4 z-10 bg-gray-900 right-0 top-0 h-[100vh] w-[200px] pl-4 sm:w-[250px] sm:pl-8   sidebar">
      <nav>
        <ul>
          <div>
            <li
              onClick={handleClick}
              className="text-3xl font-extrabold absolute sm:right-[36px] sm:top-[28px] right-[18px] top-[14px]"
            >
              <RiCloseLine />
            </li>
            <li
              onClick={handleClick}
              className="mx-5 font-bold   text-gray-300 my-5 "
            >
              <NavLink
                className="text-xl sm:text-2xl hover:border-white hover:border-b-2"
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li
              onClick={handleClick}
              className="mx-5 font-bold   text-gray-300 my-5 "
            >
              <NavLink
                className="text-xl sm:text-2xl hover:border-white hover:border-b-2"
                to="/movie/Popular"
              >
                Popular
              </NavLink>
            </li>
            <li
              onClick={handleClick}
              className="mx-5 font-bold   text-gray-300 my-5 "
            >
              <NavLink
                className="text-xl sm:text-2xl hover:border-white hover:border-b-2"
                to="/movie/Now_Playing"
              >
                Now Playing
              </NavLink>
            </li>
            <li
              onClick={handleClick}
              className="mx-5 font-bold   text-gray-300 my-5 "
            >
              <NavLink
                className="text-xl sm:text-2xl hover:border-white hover:border-b-2"
                to="/movie/Upcoming"
              >
                Upcoming
              </NavLink>
            </li>
            <li
              onClick={handleClick}
              className="mx-5 font-bold   text-gray-300 my-5 "
            >
              <NavLink
                className="text-xl sm:text-2xl hover:border-white hover:border-b-2"
                to="/movie/Top_Rated"
              >
                Top Rated
              </NavLink>
            </li>
            <li
              onClick={handleClick}
              className="mx-5 font-bold   text-gray-300 my-5 "
            >
              <NavLink
                className="text-xl sm:text-2xl hover:border-white hover:border-b-2"
                to="/search/sherlock"
              >
                Search
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
