import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { toast } from "react-toastify";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAs2wxfd9vSqKAWu9l4ZXYOtc8Y4bFJLYQ",
  authDomain: "fullstack-todo-ee628.firebaseapp.com",
  projectId: "fullstack-todo-ee628",
  storageBucket: "fullstack-todo-ee628.appspot.com",
  messagingSenderId: "800832624470",
  appId: "1:800832624470:web:ac31d08de1656d760ee8f7",
};

export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user=>{
      if(user){
        setUser(user);

      }
      else{
        setUser(null);
      }
    })
  }, []);
//-----------------------------------------------------
  const isLoggedIn = user ? true : false;
//-----------------------------------------------------
const registerUser = async ( email, password) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    toast.success("Registration successful!");
  } catch (error) {
    console.error("Error during registration:", error);
    toast.error("Registration failed: " + error.message);
  }
};

  //-----------------------------------------------------
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during Login:", error);
      toast.error("Login failed: " + error.message);
    }
  };
   //-----------------------------------------------------
   const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <FirebaseContext.Provider value={{ registerUser, loginUser,isLoggedIn, logoutUser }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
