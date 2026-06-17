import "./style/dark.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products"; 
import ProductDetail from "./pages/productDetail/ProductDetail"; 
import {
  DarkModeContextProvider,
  DarkModeContext,
} from "./context/darkModeContext";

function AppContent() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/produits/:id" element={<ProductDetail />} />
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
