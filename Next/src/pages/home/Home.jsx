import Layout from "../../components/Layout/Layout"; 
import Table from "../../table/Table"; 
import Products from "../../table/ProductTable"; 
import "./home.scss";
import { useProducts } from '../../context/ProductContext'; // ← Importez le hook

const Home = () => {
  const { produits } = useProducts(); // ← Récupérez les produits du Context

  return (
    <Layout>
      <div className="listContainer">
        <div className="listTitle">Dernières transactions</div>
        <Table />
      </div>
      <div className="listTitle">Stocks actuels</div>
      <Products produits={produits} /> {/* ← Passez les produits en prop */}
    </Layout>
  );
};

export default Home;

