import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../NavBar/NavBar';
import './layout.scss';

const Layout = ({ children }) => {
  console.log("Layout render");
  return (
    <div className="layout">
      <Sidebar />
      <div className="layoutContainer">
        <Navbar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;