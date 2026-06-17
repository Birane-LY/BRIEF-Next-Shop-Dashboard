// import Layout from "/src/components/Layout/Layout"; 
// import ProductTable from "/src/table/ProductTable";
// import "./products.scss";
// import { useState } from 'react';
// import AjoutProduit from "../../forms/ajoutProduit";
// import { useProducts } from '../../context/ProductContext'; // Importez

// const Products = () => {
//   const { produits, addProduit } = useProducts(); // Utilisez le contexte
//   const [showForm, setShowForm] = useState(false);


//   return (
//     <Layout>
//       <div className="productsPage">
//         <div className="productsHeader">
//           <h2 className="pageTitle">Liste des produits</h2>
//           <button className="addButton" onClick={() => setShowForm(true)}>
//             + Ajouter un produit
//           </button>
//         </div>
        
//         {showForm && (
//           <AjoutProduit addProduit={addProduit} />
//         )}
        
//         <ProductTable produits={produits} />
//       </div>
//     </Layout>
//   );
// };

// export default Products;




import Layout from "/src/components/Layout/Layout"; 
import ProductTable from "/src/table/ProductTable";
import "./products.scss";
import { useState } from 'react';
import AjoutProduit from "../../forms/ajoutProduit";
import { useProducts } from '../../context/ProductContext';

const Products = () => {
  const { produits, addProduit } = useProducts();
  const [showForm, setShowForm] = useState(false);

  // Fonction pour fermer le formulaire
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="productsPage">
        <div className="productsHeader">
          <h2 className="pageTitle">Liste des produits</h2>
          <button className="addButton" onClick={() => setShowForm(true)}>
            + Ajouter un produit
          </button>
        </div>
        
        {/* Popup conditionnelle */}
        {showForm && (
          <AjoutProduit 
            addProduit={addProduit} 
            onClose={handleCloseForm} // ← On passe la fonction pour fermer
          />
        )}
        
        <ProductTable produits={produits} />
      </div>
    </Layout>
  );
};

export default Products;