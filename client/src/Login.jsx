import React from 'react'
import { useState } from 'react'
import './App.css'
import axios from 'axios'



function Login({login, changePage}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    const logUser = async () => {
        await axios.post('http://localhost:4000/api/user/login', {username, password}) 
        .then(response => {
            console.log(response.data)
            login(response.data); // Met à jour l'état avec les données récupérées depuis le serveur
        })
        .catch(error => {
            console.error('Erreur lors du login:', error);
        });
    };
  


    return (
        <>
        <h1>Se connecter</h1>
		<form onSubmit={logUser} id="login_form">
			<label htmlFor="chp_login">Nom d'utilisateur</label><input id="chp_login" type="text" value={username} onChange={handleUsernameChange} required />
			<label htmlFor="chp_pwd">Mot de passe</label><input id="chp_pwd" type="password" value={password} onChange={handlePasswordChange}   autoComplete='on' required />
			<button type="submit">Connexion</button>
			<button type="reset">Annuler</button>
		</form>
        <button onClick={ () => changePage("signin_page") }>Pas de compte?</button>
        </>
    );
}


  
export default Login ;