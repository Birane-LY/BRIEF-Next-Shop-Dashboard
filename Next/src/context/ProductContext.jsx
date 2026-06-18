import { createContext, useContext, useState, useEffect } from 'react';
import { productsMock } from '../table/productsMock';

const ProductContext = createContext();
const STORAGE_KEY = 'nextshop_products';

export const ProductProvider = ({ children }) => {
  const loadProducts = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erreur de chargement:', error);
    }
    return productsMock;
  };

  const [produits, setProduits] = useState(loadProducts());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(produits));
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
    }
  }, [produits]);

  // Ajouter un produit
  const addProduit = (produit) => {
    const newId = Date.now().toString(36).slice(-4);

    
    const newProduct = {
      id: newId,
      product: produit.product,
      amount: parseFloat(produit.amount),
      description: produit.description || '',
      stocks: parseInt(produit.stocks),
      category: produit.category || 'Autre',
      image: produit.image || 'https://via.placeholder.com/40',
    };
    
    setProduits([...produits, newProduct]);
    
  };

  // Supprimer un produit
  const deleteProduit = (id) => {
    setProduits(produits.filter(p => p.id !== id));
  
  };

  // Modifier un produit
  const updateProduit = (id, updatedData) => {
    const updated = produits.map(p => 
      p.id === id ? { 
        ...p, 
        product: updatedData.product || p.product,
        amount: parseFloat(updatedData.amount) || p.amount,
        description: updatedData.description || p.description,
        stocks: parseInt(updatedData.stocks) || p.stocks,
        category: updatedData.category || p.category,
        image: updatedData.image || p.image,
      } : p
    );
    setProduits(updated);
    return { success: true };
  };

  return (
    <ProductContext.Provider value={{ 
      produits, 
      setProduits, 
      addProduit, 
      deleteProduit, 
      updateProduit 
    }}>
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
// // context/ProductContext.jsx
// import { createContext, useContext, useState } from 'react';
// import { productsMock } from '../table/productsMock';

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [produits, setProduits] = useState(productsMock);

//   const addProduit = (produit) => {
//     produit.id = produits.length + 1;
//     setProduits([...produits, produit]);
//   };

//   return (
//     <ProductContext.Provider value={{ produits, setProduits, addProduit }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error('useProducts must be used within a ProductProvider');
//   }
//   return context;
// };