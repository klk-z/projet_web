import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Logout from './Logout.jsx'


function NavigationPanel({login, logout, isConnected}) {
    

    return (
      <nav id="navigation_pan">
        {isConnected ? <Logout logout={logout} /> : <Login login={login} />}
      </nav>
    );
}


  
export default NavigationPanel ;