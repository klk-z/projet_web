import React from "react";
import "./App.css";

function Logout({ logout }) {
  return <button onClick={logout}>Déconnexion</button>;
}

export default Logout;
