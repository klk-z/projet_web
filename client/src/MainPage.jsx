import React from "react";
import { useState } from "react";
import "./App.css";
import NavigationPanel from "./NavigationPanel.jsx";
import Forum from "./Forum.jsx";
import Signin from "./Signin.jsx";
import Login from "./Login.jsx";
import ProfilePage from "./ProfilePage.jsx";

function MainPage() {
  const [currentPage, setCurrentPage] = useState("signin_page"); // Page de connexion par défaut
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState({});
  const [usernameProfile, setUsernameProfile] = useState(user.username);

  // Méthode pour se connecter et changer la page
  const getConnected = () => {
    setIsConnected(true); // Mettre isConnected à true pour indiquer que l'utilisateur est connecté
    // TODO remplacer par les données du user
    setUser({
      username: "admin",
      password: "admin",
      firstname: "admin",
      lastname: "admin",
      isBanned: false,
      isAdmin: true,
      newUser: false,
      __v: 0,
    });
    console.log('utilisateur connecté : ', user.username);
    changePage("forum");
  };

  const getSignedIn = (userData) => {
    setIsConnected(true); // Mettre isConnected à true pour indiquer que l'utilisateur est connecté
    setUser(userData);
    changePage("forum");
  };

  const setLogout = () => {
    setCurrentPage("login_page");
    setIsConnected(false);
    setUser({});
    console.log('utilisateur deconnecté')
  };

  const changePage = (page, author) => {
    if (user.isBanned) {
      alert("Vous avez été banni.");
      return;
    }
    setCurrentPage(page);
    console.log('--> ', page);
    if (author) {
      setUsernameProfile(author);
    }
  };

  const getPage = () => {
    switch (currentPage) {
      case "signin_page":
        return <Signin signin={getSignedIn} changePage={changePage} />;
      case "login_page":
        return (
          <Login
            login={getConnected}
            changePage={changePage}
            setUser={setUser}
          />
        );
      case "forum":
        return <Forum user={user} changePage={changePage} />;
      case "profile_page":
        return (
          <ProfilePage
            user={user}
            usernameProfile={usernameProfile}
            changePage={changePage}
          />
        );
      default:
        return "Veuillez Rafraichir";
    }
  };

  return (
    <>
      <NavigationPanel
        logout={setLogout}
        isConnected={isConnected}
        changePage={changePage}
        user={user}
      />
      <div className="main_page">{getPage()}</div>
    </>
  );
}

export default MainPage;