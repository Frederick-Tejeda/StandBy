import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Intro from './views/Intro.jsx'
import Signin from './views/Signin.jsx'
import Login from './views/Login.jsx'
import Home from './views/Home.jsx'
import ChangePassword from './views/ChangePassword.jsx'

function App() {

  return (
        <>
            <Routes>
                <Route path='/' Component={Intro}/>
                <Route path='/signin' Component={Signin}/>
                <Route path='/login' Component={Login}/>
                <Route path='/home' Component={Home}/>
                <Route path='/change' Component={ChangePassword}/>
            </Routes>
        </>
  );
}

export default App;
