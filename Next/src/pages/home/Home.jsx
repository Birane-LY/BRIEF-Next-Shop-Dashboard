// src/pages/home/Home.jsx
import Layout from "../../components/Layout/Layout"; // ← remonte de 2 dossiers (pages/home → src)
import Table from "../../table/Table"; // ← idem
import Products from "../../table/ProductTable"; // ← idem
import "./home.scss";

const Home = () => {
  return (
    <Layout>
      <div className="listContainer">
        <div className="listTitle">Dernières transactions</div>
        <Table />
      </div>
      <div className="listTitle">Stocks actuels</div>
      <Products />
    </Layout>
  );
};

export default Home;
