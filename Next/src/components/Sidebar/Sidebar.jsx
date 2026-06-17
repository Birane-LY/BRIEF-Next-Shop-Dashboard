// src/components/Sidebar/Sidebar.jsx
import { useContext } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccountIcon from '@mui/icons-material/AccountCircleRounded';
import ExitIcon from '@mui/icons-material/ExitToAppRounded';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';
import './sidebar.scss';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to="/">
          <span className='logo'>Next-Shop</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>Principal</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <hr />
          
          <p className='title'>Liste</p>
          <Link to="/utilisateurs" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className='icon' />
              <span>Utilisateurs</span>
            </li>
          </Link>

          <Link to="/produits" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className='icon' />
              <span>Produits</span>
            </li>
          </Link>

          <Link to="/commandes" style={{ textDecoration: "none" }}>
            <li>
              <ReceiptIcon className="icon" />
              <span>Commandes</span>
            </li>
          </Link>

          <li>
            <NotificationsIcon className='icon' />
            <span>Notifications</span>
          </li>

          <li>
            <AccountIcon className='icon' />
            <span>Profil</span>
          </li>
        </ul>
      </div>

      {/* BOTTOM - Tout en bas du Sidebar */}
      <div className="bottom">
        <div className="colorOptions">
          <div className="colorOption" onClick={() => { dispatch({ type: 'LIGHT' }) }}></div>
          <div className="colorOption" onClick={() => { dispatch({ type: 'DARK' }) }}></div>
        </div>
        <div className="logoutItem">
          <ExitIcon className='icon' />
          <span>Déconnexion</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;