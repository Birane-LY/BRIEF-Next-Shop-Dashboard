// src/pages/home/Home.jsx
import Layout from "../../components/Layout/Layout";
import Table from "../../table/Table";
import KPICards from "../../components/KPICards/KPICards";
import Charts from "../../components/Charts/Charts";
import "./home.scss";
import { useProducts } from '../../context/ProductContext';
import ProductTable from "../../table/ProductTable";

const Home = () => {
  const { produits } = useProducts();
  
  // Date et heure actuelles
  const now = new Date();
  const dateTime = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Layout>
      <div className="home">
        {/* KPI Cards */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title"> Tableau de bord</h2>
            <span className="section-badge">{dateTime}</span>
          </div>
          <KPICards />
        </section>

        {/* Graphiques */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title"> Analyses</h2>
            <span className="section-subtitle">Vue d'ensemble des produits</span>
          </div>
          <Charts />
        </section>

        {/* Tableaux */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title"> Stocks actuels</h2>
            <span className="section-subtitle">{produits?.length || 0} produits en stock</span>
          </div>
          <div className="table-wrapper">
            <ProductTable produits={produits} />
          </div>
        </section>

        {/* Dernières transactions */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title"> Dernières transactions</h2>
            <span className="section-subtitle">Activité récente</span>
          </div>
          <div className="table-wrapper">
            <Table />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;