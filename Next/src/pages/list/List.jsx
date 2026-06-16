import './list.scss';
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/NavBar/NavBar'

const List = () => {
  return (
    <div className="list">
      <Sidebar />
    <div className="listContainer">
      <Navbar/>
    </div>
    </div>
  )
}

export default List