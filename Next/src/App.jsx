
import "./style/dark.scss";
import {BrowserRouter,Routes, Route,Navigate} from 'react-router-dom';
import { useContext } from 'react';
import Home from './pages/Home';
import List from './pages/List';
import DarkModeContext from './context/darkModeContex'

function App() {
  const {darkMode} = useContext(DarkModeContext)
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Home/>
          </Route>
          <Route>
            <List/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
