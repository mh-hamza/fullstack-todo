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
import { addDoc, getFirestore, collection, getDoc, doc, setDoc, } from "firebase/firestore";



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
const firestore = getFirestore(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [activeUserDetails, setActiveUserDetails] = useState('');

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  //-----------------------------------------------------
  const isLoggedIn = user ? true : false;
  //-----------------------------------------------------
  const registerUser = async (email, password, name) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
     const activeUser = firebaseAuth.currentUser
     if(activeUser){
      await setDoc(doc(firestore, "users", activeUser.uid),{
          name: name,
          email: activeUser.email,
          uid: activeUser.uid
      })
     }
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
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed: " + error.message);
    }
  };
  //-------------------------------------------------------------
  const fetchUserData = async () => {  //there are fetching logged in user details
    firebaseAuth.onAuthStateChanged(async (user)=>{
      // console.log("User: " + user)
      if(user){
        const docRef = doc(firestore, "users", user.uid)
        const docSnap = await getDoc(docRef)
        // console.log(docSnap.data())
        if(docSnap.exists()){
          setActiveUserDetails(docSnap.data())
        }
        else{
          setActiveUserDetails('')
          console.log("Document does not exist")
        }
      }
    })
     
}

  return (
    <FirebaseContext.Provider value={{
      registerUser,
      loginUser,
      isLoggedIn,
      logoutUser,
      user,
      fetchUserData,
      activeUserDetails,
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
