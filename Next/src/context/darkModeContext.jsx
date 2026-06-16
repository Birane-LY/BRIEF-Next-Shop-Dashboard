import { createContext, useReducer } from "react";
import {DarkModeReducer} from "./darkModeReducer"

const INITIAL_STATE = {
  darkMode: false,
};

// Création du Contexte
export const DarkModeContext = createContext(INITIAL_STATE)

//
export const DarkModeContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);
  return(
  <DarkModeContext.Provider value= {{darkMode: state.darkMode,dispatch}}>
    {children} // Tous les composants enfants
  </DarkModeContext.Provider>
  )

}

