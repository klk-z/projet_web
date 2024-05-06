import React from 'react'
import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Logout from './Logout.jsx'
import logo from"./assets/reddit_pastel.png"
import pfp from "./assets/default-profile-pic.jpg" 


function NavigationPanel({login, logout, signin, isConnected, setCurrentPage, user}) {
    
    return (
      <nav id="navigation_pan">
        <div className="header_part">
			    
			    <div className="header_left">
            <img id="logo" src={logo} alt="blue reddit"/> 
          </div>
          {/*isConnected && user.isAdmin ? (
              <a>
                <h3 className='admin_switch' href='#' onClick={ () => setCurrentPage("forum_admin")}>
                admin
                </h3>
              </a>
            ):<></>*/}
          <div className="header_middle">
            <h1>Tell'IT</h1>
            {isConnected && user ? (<>
              <input type="search"/> <button>Chercher</button><br/>
				      <label htmlFor="date_debut">Du : </label><input id="date_debut" type="date"/>
				      <label htmlFor="date_fin">Au : </label><input id="date_fin" type="date"/></>
            ):<></>}
          </div>
          <div className="liens">
            { user && user.pfp ?
            (<img id="profile_pic" src={user.pfp} alt="Photo de profil"/>) :
				    (<img id="profile_pic" src={pfp} alt="Photo de profil"/>)
            }
			    </div>
        </div>
        {/*isConnected ? <Logout logout={logout} changePage={setCurrentPage}/> : <Login login={login} changePage={setCurrentPage}/>*/}
      </nav>
    );
}


  
export default NavigationPanel ;