import { useState } from 'react'
import {  BrowserRouter as Router,  Routes,  Route, Link} from "react-router-dom";
import './App.css'
import NavigationPanel from './NavigationPanel.jsx'
import Forum from './Forum.jsx'
import Signin from './Signin.jsx'
import Login from './Login.jsx'


function MainPage() {
    const [currentPage, setCurrentPage] = useState('signin_page'); // Page de connexion par défaut
    const [isConnected, setIsConnected] = useState(false);

    // Méthode pour se connecter et changer la page
    const getConnected = () => {
        //setCurrentPage('message_page'); // Changer la page courante pour la page des messages
        setIsConnected(true); // Mettre isConnected à true pour indiquer que l'utilisateur est connecté 
        //requete post avec fetch ou axios
    };

    const setLogout = () => {
        //setCurrentPage('signin_page'); 
        setIsConnected(false); 
    };



    

    return (
      <Router basename="">
            <Routes>
                <Route path="/signin" element={<Signin login={getConnected}/>}/> 
                <Route path="/login" element={<Login login={getConnected}/> }/>
                {/* Render Forum component when user is connected */}
                {isConnected ? <Link to="/forum" /> : null}
                <Route path="/forum" element={<Forum/>}/>
            </Routes>
        </Router>
    );
}


  
export default MainPage ;

/*
{currentPage==="signin_page"? <Signin login={getConnected}/> : <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>}
        {currentPage==="message_page"? <Forum/> : <></>}
*/