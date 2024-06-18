import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import {
  addDoc,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [activeUserDetails, setActiveUserDetails] = useState("");

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
      const activeUser = firebaseAuth.currentUser;
      if (activeUser) {
        await setDoc(doc(firestore, "users", activeUser.uid), {
          name: name,
          email: activeUser.email,
          uid: activeUser.uid,
        });
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
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      }
      toast.success("Login with Google successful!");
      window.location.reload(); // Refresh the window
    } catch (error) {
      console.error("Error during Google Login:", error);
      toast.error("Google Login failed: " + error.message);
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
  const fetchUserData = async () => {
    if (user) {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setActiveUserDetails(docSnap.data());
      } else {
        setActiveUserDetails("");
        console.log("Document does not exist");
      }
    }
  };
  //-------------------------------------------------------------
  const addTodoList = async (title) => {
    try {
      if (user) {
        // Make sure the user is logged in
        const userTodosRef = collection(firestore, `users/${user.uid}/todos`);
        await addDoc(userTodosRef, {
          title: title,
          completed: false,
          createdAt: new Date(),
        });
        toast.success("Todo added successfully!");
      } else {
        console.log("User not logged in");
        toast.error("User not logged in");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo: " + error.message);
    }
  };
  //-------------------------------------------------------------
  const listUsersTodos = async () => {
    try {
      if (user) {
        const todosRef = collection(firestore, `users/${user.uid}/todos`);
        const todosSnapshot = await getDocs(todosRef);
        const todosList = todosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return todosList;
      } else {
        console.log("User not logged in");
        toast.error("User not logged in");
        return [];
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to fetch todos: " + error.message);
      return [];
    }
  };
  //-------------------------------------------------------------
  const deleteUserTodo = async (todoId) => {
    try {
      if (user) {
        const todoDocRef = doc(firestore, `users/${user.uid}/todos`, todoId);
        await deleteDoc(todoDocRef);
        toast.success("Todo deleted successfully!");
      } else {
        console.log("User not logged in");
        toast.error("User not logged in");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo: " + error.message);
    }
  };
  //-------------------------------------------------------------
  const editUserTodo = async (todoId, updatedTitle) => {
    try {
      if (user) {
        const todoDocRef = doc(firestore, `users/${user.uid}/todos`, todoId);
        await updateDoc(todoDocRef, { title: updatedTitle });
        toast.success("Todo updated successfully!");
      } else {
        console.log("User not logged in");
        toast.error("User not logged in");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo: " + error.message);
    }
  };
  //-------------------------------------------------------------
  const todoCheckbox = async (todoId, isChecked) => {
    try {
      if (user) {
        const todoDocRef = doc(firestore, `users/${user.uid}/todos/${todoId}`);
        const docSnapshot = await getDoc(todoDocRef);
        await updateDoc(todoDocRef, { completed: isChecked });
        console.log(docSnapshot);
          };   
      }
     catch (error) {
      console.error("Error updating todo:", error);
    }
  }
  return (
    <FirebaseContext.Provider
      value={{
        registerUser,
        loginUser,
        isLoggedIn,
        logoutUser,
        user,
        fetchUserData,
        addTodoList,
        activeUserDetails,
        listUsersTodos,
        deleteUserTodo,
        loginWithGoogle,
        editUserTodo,
        todoCheckbox
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
