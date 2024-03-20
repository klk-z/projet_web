import { useState } from 'react'
import './App.css'



function User() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    

    return (
        <>
        <h1>Se connecter</h1>
		<form onSubmit={login}>
			<label htmlFor="chp_login">Nom d'utilisateur</label><input id="chp_login" type="text" value={username} onChange={handleUsernameChange} required />
			<label htmlFor="chp_pwd">Mot de passe</label><input id="chp_pwd" type="password" value={password} onChange={handlePasswordChange} required />
			<button type="submit">Connexion</button>
			<button type="reset">Annuler</button>
		</form>
        </>
    );
}


  
export default User ;