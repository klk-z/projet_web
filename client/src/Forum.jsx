import React from "react";
import { useState } from "react";
import ListMessages from "./ListMessages.jsx";
import NewUsers from "./NewUsers.jsx";
import "./App.css";

function Forum({ user, changePage }) {
  const [admin, setAdmin] = useState(false);

  const handleSwitch = () => {
    setAdmin(admin == false ? true : false);
  };

  return (
    <>
      <h1>Forum</h1>
      <div className="forum-container">
        <div className="panel_left">
          {user.isAdmin ? (
            <button className="forum_switch" onClick={() => handleSwitch()}>
              {admin == true ? ">forum<" : ">admin<"}
            </button>
          ) : (
            <></>
          )}
          {admin ? (
            <div className="zone_verification">
              <NewUsers />
            </div>
          ) : (
            <></>
          )}
          <div className="zone_informations">
            <h2>Informations</h2>
            <div className="post-it">
              <h3>Rendez-vous fleuri 🌸!</h3> Ce week-end les 11 et 12 mai, venez
              rencontrez vos admins !
            </div>
            <br></br>
            <div className="post-it">
              <h3> ⚠️⚠️⚠️  <br></br> Soyez toujours polis ! <br></br> ⚠️⚠️⚠️</h3> 
            </div>
            <br></br>
            <div className="post-it">
              <h3>Joyeuses Pâques 🎁🥚!</h3> Toc, toc, toc : le lapin de Pâques 
              vous a laissé de délicieuses gourmandises. Saurez-vous les retrouver ?
            </div>
            <br></br>
            <div className="post-it">
              <h3>Bonne année 2024 🎉 !</h3> « Comme un éternel renouvellement, <br></br>
              Cette année s’achève pour laisser place <br></br>
              À une page blanche que je te souhaite <br></br>
              De remplir des plus belles promesses… » <br></br>
            </div>
          </div>
        </div>
        <div className="zone_messages">
          {admin ? (
            <h2>Derniers posts des admins</h2>
          ) : (
            <h2>Derniers posts</h2>
          )}
          <div className="liste_messages">
            <ListMessages
              adminMode={admin}
              user={user}
              changePage={changePage}
            />
          </div>
        </div>
      </div>
    </>
  );

}

export default Forum;