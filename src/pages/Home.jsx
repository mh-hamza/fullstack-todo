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
        <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Our App</h1>
        <p className="text-lg text-gray-600 mb-6">Please log in to continue and access all features.</p>
        <Link
         to="/login"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
      )}
    </div>
  );
};

export default Home;
