import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const Home = () => {
  const firebase = useFirebase()
 const [name , setName] = useState("")
 const [email , setEmail] = useState("")
 
 useEffect(()=>{
  const getdata = async()=>{
    const data = await firebase.getDocument()
    if(data){
      setName(data.name)
      setEmail(data.email)
    }
   }
   getdata()
 },[firebase])
  return (
    <div>
      <h1>Welcome {name}</h1>
      <p>Email: {email}</p>
      <button >Get data</button>
    </div>
  );
};

export default Home;
