import React from 'react'
import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Logout from './Logout.jsx'


function NavigationPanel({login, logout, isConnected, to_signin}) {
    

    return (
      <nav id="navigation_pan">
        {isConnected ? <Logout logout={logout} /> : <Login login={login} to_signin={to_signin}/>}
      </nav>
    );
}


  
export default NavigationPanel ;