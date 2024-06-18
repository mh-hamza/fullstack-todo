import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
// import AddTodo from "../components/AddTodo";
import ListAllTodos from "../components/ListAllTodos"
import { Link } from "react-router-dom";
const Home = () => {
  const [user, setUser] = useState("");
  const firebase = useFirebase();
  
  useEffect(() => {
    const fetchData = async () => {
      await firebase.fetchUserData();
      setUser(firebase.activeUserDetails);
    };

    fetchData();
    // console.log(user)
  }, [firebase]);

  return (
    <div className="min-h-[400px] flex items-center justify-center max-w-[100%] bg-gray-100  m-auto">
      {user ? (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-[600px] mt-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.name}</h1>
          {/* <p className="text-lg text-gray-600 mb-6">Email: {user.email}</p> */}
         
            {/* <AddTodo /> */}
     
          <div>
            <ListAllTodos />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl text-center bg-white p-12 rounded-3xl shadow-lg transform transition-all hover:shadow-xl hover:scale-105">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Welcome to Our App
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please log in to continue and access all features.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;
