import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

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
    <div>
      {
        user ? (
          <div>
            <h1>Welcome: {user.name}</h1>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )
      }
    </div>
  );
};

export default Home;
