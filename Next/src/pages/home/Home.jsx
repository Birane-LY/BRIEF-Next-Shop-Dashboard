import React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import NavBar from "../../components/NavBar/NavBar";
import Table from "../../table/Table";

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
    </div>
    
    </div>
  )
}

export default Home