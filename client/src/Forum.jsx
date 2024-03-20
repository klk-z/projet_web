import { useState } from 'react'
import ForumPublic from './ForumPublic.jsx'
import ForumAdmin from './ForumAdmin.jsx'

import './App.css'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";




function Forum() {
    

    // const adminPage = 
    // const normalPage =

    
    
    /*
    return (
        <>
        <div class="header_part">
			<img id="logo" src="465px-Devil-goat.jpg" alt="Italian Trulli"/> 
			<div class="header_middle"><h1>Organiz'asso</h1>
				<input type="search"/> <button>Chercher</button><br/>
				<label htmlFor="date_debut">Du : </label><input id="date_debut" type="date"/>
				<label for="date_fin">Au : </label><input id="date_fin" type="date"/>
			</div>
			<div class="liens">
				<a href="OuvrirUneSession.html">Connexion</a>
				<a href="Enregistrer.html">S'enregistrer</a><br/>
				<img id="profile_pic" src="red_profile.jpg" alt="Photo de profil"/> 
			</div>
		</div>
		<div class="body_part">
			<div class="zone_informations"><h2>Informations</h2>
			</div>
			<div class="zone_messages">
				<div class="nouveau_message"><h3>Nouveau message</h3>
				</div>
				<div class="liste_messages"><h3>Liste messages</h3>
				</div>
			</div>
		</div>
        </>
    );
    */
    
	//ForumAdmin accessible que si utilisateur admin
    return (
        <>
		<Router >
          <Routes>
            <Route path="/public" element={<ForumPublic/>}/> 
            <Route path="/admin" element={<ForumAdmin/>}/>
          </Routes>
        </Router>
        </>
    )

}


  
export default Forum ;