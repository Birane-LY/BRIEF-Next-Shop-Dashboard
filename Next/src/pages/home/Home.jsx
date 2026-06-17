// src/pages/home/Home.jsx
import Layout from "../../components/Layout/Layout";
import Table from "../../table/Table";

import KPICards from "../../components/KPICards/KPICards";
import Charts from "../../components/Charts/Charts";
import "./home.scss";
import { useProducts } from '../../context/ProductContext'; // ← Importez le hook
import ProductTable from "../../table/ProductTable";

const Home = () => {
  const { produits } = useProducts(); // ← Récupérez les produits du Context

  return (
    <Layout>
      <div className="home">
        {/* KPI Cards */}
        <KPICards />

        {/* Graphiques */}
        <Charts />

        {/* Tableaux */}
       

       
      <div className="listTitle">Stocks actuels</div>
      <ProductTable produits={produits} /> {/* ← Passez les produits en prop */}
      </div>
    </Layout>
  );
};

export default Home;

