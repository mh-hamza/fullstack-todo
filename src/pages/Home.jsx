import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import AddTodo from "../components/AddTodo";
import ListAllTodos from "../components/ListAllTodos"
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
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      {user ? (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.name}</h1>
          <p className="text-lg text-gray-600 mb-6">Email: {user.email}</p>
          <div className="mt-6">
            <AddTodo />
          </div>
          <div>
            <ListAllTodos />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
