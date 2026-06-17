import Layout from "/src/components/Layout/Layout"; 
import ProductTable from "/src/table/ProductTable";
import "./products.scss";

const Products = () => {
  return (
    <Layout>
      <div className="productsPage">
        <div className="productsHeader">
          <h2 className="pageTitle">Liste des produits</h2>
          <button className="addButton">+ Ajouter un produit</button>
        </div>
        <ProductTable />
      </div>
    </Layout>
  );
};

export default Products;