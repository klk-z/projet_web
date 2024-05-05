import React from 'react'
import { useState } from 'react'
import './App.css'

function Signin({login, changePage}){
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwd2, setPwd2] = useState('');
  
	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	  };

	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	  };

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	  };
	const handlePwdChange = (event) => {
	  setPwd(event.target.value);
	};
  
	const handlePwd2Change = (event) => {
	  setPwd2(event.target.value);
	};
  
	const handleSubmit = async (event) => {
	  event.preventDefault();
	  if (pwd !== pwd2) {
		alert("Les mots de passe sont différents !");
	  } else {
		const userData = {
			login: username,
			password: pwd,
			lastname: lastName,
			firstname: firstName
		  };

		try {
			const response =  await fetch('http://localhost:4000/api/user', {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(userData)
			});
	  
			if (!response.ok) {
			  throw new Error('Erreur lors de la création du compte');
			}
			
			// Effectuez d'autres actions après la création réussie de l'utilisateur, par exemple, redirigez l'utilisateur vers une autre page
			changePage("waiting_room");
		  } catch (error) {
			alert("Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer plus tard.");
		  }
		}
	};
	

    return (
    <>
    <h1>Créer un compte</h1>
    <form onSubmit={handleSubmit}>
			<label id="label_firstname" htmlFor="chp_firstname">Prénom</label><label id="label_lastname" htmlFor="chp_lastname">Nom</label>
			<input id="chp_firstname" type="text" onChange={handleFirstNameChange} required /><input id="chp_lastname" type="text" onChange={handleLastNameChange} required />
			<label htmlFor="chp_username">Nom d'utilisateur</label><input id="chp_username" type="text" onChange={handleUsernameChange} required />
			<label htmlFor="chp_pwd">Mot de passe</label><input id="chp_pwd" type="password" onChange={handlePwdChange} required />
			<label htmlFor="chp_pwd2">Confirmez votre mot de passe</label><input id="chp_pwd2" type="password" onChange={handlePwd2Change} required />
			<button type="submit">Sign in</button>
			<button type="reset">Annuler</button>
	</form>
	<button onClick={ () => changePage("login_page")}>Déjà un compte?</button>
    </>
    );
}

export default Signin