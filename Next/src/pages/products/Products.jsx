import Layout from "/src/components/Layout/Layout"; 
import ProductTable from "/src/table/ProductTable";
import "./products.scss";
import { useState } from 'react';
import AjoutProduit from "../../forms/ajoutProduit";
import { useProducts } from '../../context/ProductContext'; // Importez

const Products = () => {
  const { produits, addProduit } = useProducts(); // Utilisez le contexte
  const [showForm, setShowForm] = useState(false);


  return (
    <Layout>
      <div className="productsPage">
        <div className="productsHeader">
          <h2 className="pageTitle">Liste des produits</h2>
          <button className="addButton" onClick={() => setShowForm(true)}>
            + Ajouter un produit
          </button>
        </div>
        
        {showForm && (
          <AjoutProduit addProduit={addProduit} />
        )}
        
        <ProductTable produits={produits} />
      </div>
    </Layout>
  );
};

export default Products;




