import React from "react";
import { Link } from "react-router-dom";
//firebase
import { useFirebase } from "../context/Firebase";

function Header() {
  const firebase = useFirebase();
  const logoutHandler = () => {
    firebase.logoutUser();
  };

  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-full px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo */}
        <div className="text-indigo-500 md:order-1">
          <h1 className="text-2xl font-bold">LOGO</h1>
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <li className="md:px-4 md:py-2 text-indigo-500">
              <Link to="/">Home</Link>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <a href="#">Search</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <a href="#">Explore</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <a href="#">About</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          {firebase.isLoggedIn ? (
            <button
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              onClick={logoutHandler}
            >
              <span>Log out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M17 3a1 1 0 01-1 1v12a1 1 0 111-1V4a1 1 0 01-1-1zm-7.707 3.293a1 1 0 010 1.414L10.586 9H3a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414z" 
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
