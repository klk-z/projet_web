import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'

function Signin({login}){
	/*
	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [util, setUtil] = useState('');
	*/
	const [mdp, setMdp] = useState('');
	const [mdp2, setMdp2] = useState('');
  
	/*
	const handlePrenomChange = (event) => {
	  setPrenom(event.target.value);
	};
  
	const handleNomChange = (event) => {
	  setNom(event.target.value);
	};
  
	const handleUtilChange = (event) => {
	  setUtil(event.target.value);
	};
	*/
  
	const handleMdpChange = (event) => {
	  setMdp(event.target.value);
	};
  
	const handleMdp2Change = (event) => {
	  setMdp2(event.target.value);
	};
  
	const handleSubmit = (event) => {
	  event.preventDefault();
	  if (mdp !== mdp2) {
		alert("Les mots de passe sont différents !");
	  } else {
		login();
	  }
	};

    return (
    <>
    <h1>Créer un compte</h1>
    <form onSubmit={handleSubmit}>
			<label id="label_prenom" htmlFor="chp_prenom">Prénom</label><label id="label_nom" htmlFor="chp_nom">Nom</label>
			<input id="chp_prenom" type="text" required="required" /><input id="chp_nom" type="text" required />
			<label htmlFor="chp_util">Nom d'utilisateur</label><input id="chp_util" type="text" required />
			<label htmlFor="chp_mdp">Mot de passe</label><input id="chp_mdp" type="password" onChange={handleMdpChange} required />
			<label htmlFor="chp_mdp2">Confirmez</label><input id="chp_mdp2" type="password" onChange={handleMdp2Change} required />
			<button type="submit">Sign in</button>
			<button type="reset">Annuler</button>
	</form>
	<a href={'/login'}>Déjà un compte ?</a>
    </>
    );
}

export default Signin