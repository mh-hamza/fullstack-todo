import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { toast } from "react-toastify";



const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAs2wxfd9vSqKAWu9l4ZXYOtc8Y4bFJLYQ",
  authDomain: "fullstack-todo-ee628.firebaseapp.com",
  projectId: "fullstack-todo-ee628",
  storageBucket: "fullstack-todo-ee628.appspot.com",
  messagingSenderId: "800832624470",
  appId: "1:800832624470:web:ac31d08de1656d760ee8f7"
};

export const useFirebase =()=> useContext(FirebaseContext)
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

export const FirebaseProvider = (props) => {

  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed: " + error.message);
    }
  };

  return (
    <FirebaseContext.Provider value={{registerUser}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
