import React from "react";
import { useState } from "react";
import "./App.css";
import Logout from "./Logout.jsx";
import logo from "./assets/logo.png";
import pfp from "./assets/purple3.jpeg";

function NavigationPanel({
  logout,
  isConnected,
  changePage,
  user,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="navigation_pan">
      <div className="header_part">
        <div className="header_left">
          <img id="logo" src={logo} alt="logo" onClick={() => isConnected && changePage("forum")}/>
        </div>
        <div className="header_middle">
          <h1>Tell'IT</h1>
          {isConnected && user ? (
            <>
              <input type="search" /> <button>Chercher</button>
              <br />
              <label htmlFor="date_debut">Du : </label>
              <input id="date_debut" type="date" />
              <label htmlFor="date_fin">Au : </label>
              <input id="date_fin" type="date" />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="liens">
          {isConnected ? (
            <div className="profile-pic" onClick={handleToggleMenu}>
              {user && user.pfp ? (
                <img id="profile_pic" src={user.pfp} alt="Photo de profil" />
              ) : (
                <img id="profile_pic" src={pfp} alt="Photo de profil" />
              )}
              @{user.username}
            </div>
          ) : (
            <></>
          )}
          {menuOpen && isConnected && (
            <div className="menu">
              <button onClick={() => changePage("profile_page", user.username)}>
                Profil
              </button>
              <Logout logout={logout} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationPanel;
