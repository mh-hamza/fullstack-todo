import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase"; // Adjust the path as necessary

const Home = () => {
  const { getUsers } = useFirebase();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList);
    };
    fetchUsers();
  }, [getUsers]);

  return (
    <div>
     
      <ul>
        {users.map((user, index) => (
          <div key={index}>
             <h1>Welcome to {user.name}</h1>
            <h1> {user.name} </h1>
            <p>({user.email})</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
