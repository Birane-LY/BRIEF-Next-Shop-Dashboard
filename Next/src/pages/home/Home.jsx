import React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import NavBar from "../../components/NavBar/NavBar";
import Table from "../../table/Table";
import Products from '../../table/Products';

import "./home.scss"

const Home = () => {
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <NavBar/>
      <div className="listContainer">
     <div className="listTitle">Dernières transactions</div>
     <Table />
      </div>
       <div className="listTitle">Stocks actuels</div>
         <Products />
      </div>
    </div>
    
 
  )
}

export default Home