// context/ProductContext.jsx
import { createContext, useContext, useState } from 'react';
import { productsMock } from '../table/productsMock';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [produits, setProduits] = useState(productsMock);

  const addProduit = (produit) => {
    produit.id = produits.length + 1;
    setProduits([...produits, produit]);
  };

  return (
    <ProductContext.Provider value={{ produits, setProduits, addProduit }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};