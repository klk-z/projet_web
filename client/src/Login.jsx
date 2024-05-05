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
    

    async function try_login(){
        try {
            await axios.get("http://localhost:5173/api/user/login", {
                params: {
                    login: username,
                    password: password
                }
            })
        }catch(err){
            console.log(err)
        }
        login();
    }

    return (
        <>
        <h1>Se connecter</h1>
		<form onSubmit={try_login} >
			<label htmlFor="chp_login">Nom d'utilisateur</label><input id="chp_login" type="text" value={username} onChange={handleUsernameChange} required />
			<label htmlFor="chp_pwd">Mot de passe</label><input id="chp_pwd" type="password" value={password} onChange={handlePasswordChange} required />
			<button type="submit">Connexion</button>
			<button type="reset">Annuler</button>
		</form>
        <button onClick={ () => changePage("signin_page") }>Pas de compte?</button>
        </>
    );
}


  
export default Login ;