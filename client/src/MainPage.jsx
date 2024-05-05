import React from 'react'
import { useState } from 'react'
import './App.css'
import NavigationPanel from './NavigationPanel.jsx'
import Forum from './Forum.jsx'
import Signin from './Signin.jsx'
import Login from './Login.jsx'
import ProfilePage from './ProfilePage.jsx'


function MainPage() {
    const [currentPage, setCurrentPage] = useState('signin_page'); // Page de connexion par défaut
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState("");

    // Méthode pour se connecter et changer la page
    const getConnected = (event) => {
        setIsConnected(true); // Mettre isConnected à true pour indiquer que l'utilisateur est connecté 
        setCurrentPage('forum');
        setUser()
    };

    const setLogout = () => {
        //setCurrentPage('signin_page'); 
        setIsConnected(false); 
    };

    const sendToCheck = () => {
        // envoie au admin pour etre checké accepté ou non (banned ?)
    }

    const changePage = (page) => {
        setCurrentPage(page); 
    };
    
    const getPage = () => {
        switch (currentPage) {
            case "signin_page":
                return <Signin signin={sendToCheck} changePage={changePage}/>
            case "login_page":
                return <Login login={getConnected} changePage={changePage}/>
            case "forum":
                return <Forum />
            case "waiting_room":
                return <WaitingRoom />
            default:
                return "Veuillez Rafraichir"
        }
    }
    

    return (
        <>
        <NavigationPanel login = {getConnected} logout={setLogout} isConnected={isConnected} changePage={changePage} user={user} />
        <div className="body_part">
			{getPage()}
		</div>
        </>
      
    );
}


export default MainPage ;

// {isConnected ? <Logout logout={setLogout} changePage={changePage}/> : <Login login={getConnected} changePage={changePage}/>} 