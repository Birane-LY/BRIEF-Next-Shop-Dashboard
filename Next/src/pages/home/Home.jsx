import Layout from "../../components/Layout/Layout"; 
import Table from "../../table/Table"; 
import Products from "../../table/ProductTable"; 
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
