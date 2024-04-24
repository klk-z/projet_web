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

    // Méthode pour se connecter et changer la page
    const getConnected = (event) => {
        //setCurrentPage('message_page'); // Changer la page courante pour la page des messages
        setIsConnected(true); // Mettre isConnected à true pour indiquer que l'utilisateur est connecté 
        setCurrentPage('forum');
        //requete post avec fetch ou axios

        
    };

    const setLogout = () => {
        //setCurrentPage('signin_page'); 
        setIsConnected(false); 
    };

    const setPageLogin = () => {
        setCurrentPage('login_page'); 
    };

    const setPageSignin = () => {
        setCurrentPage('signin_page'); 
    };

    
    const getPage = () => {
        switch (currentPage) {
            case "signin_page":
                return <Signin signin={getConnected} to_login={setPageLogin}/>
            case "login_page":
                return <Login login={getConnected} to_signin={setPageSignin}/>
            case "forum":
                return <Forum />
            default:
                return <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} to_signin={setPageSignin}/>
        }
    }
    

    return (
        <>
            {getPage()}
        </>
      
    );
}


export default MainPage ;

/*
{currentPage==="signin_page"? <Signin login={getConnected}/> : <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>}
        {currentPage==="message_page"? <Forum/> : <></>}
            <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} to_signin={setPageSignin}/>
            {getPage()}

*/