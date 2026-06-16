import "./style/dark.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import { DarkModeContextProvider } from './context/darkModeContext';
import { DarkModeContext } from './context/darkModeContext';

function AppContent() {
  // Ce composant est à l'INTÉRIEUR du Provider
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="liste/" element={<List/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <DarkModeContextProvider>
      <AppContent />
    </DarkModeContextProvider>
  );
}

export default App;