import { createContext, useContext } from "react";


const FirebaseContext = createContext(null);


export const useFirebase =()=> useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={null}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
