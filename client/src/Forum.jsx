import React from 'react'
import { useState } from 'react'
import ListMessages from './ListMessages.jsx'
import './App.css'
import logo from"./assets/reddit_pastel.png"
import pfp from "./assets/default-profile-pic.jpg" 




function Forum() {
    

    // const adminPage = False
    // const normalPage =

  /*  const test = () => {
		console.log("gkgjkjg")
	}*/
    
    /*
	 return (
		<>
       <h1>Forum</h1>
	   <button onClick={ () => test()}>test</button>
	   </>
	   <div className="header_part">
			<img id="logo" src={logo} alt="blue reddit"/> 
			<div className="header_middle"><h1>Tell'IT</h1>
				<input type="search"/> <button>Chercher</button><br/>
				<label htmlFor="date_debut">Du : </label><input id="date_debut" type="date"/>
				<label htmlFor="date_fin">Au : </label><input id="date_fin" type="date"/>
			</div>
			<div className="liens">
				<img id="profile_pic" src={pfp} alt="Photo de profil"/> 
			</div>
		</div>
    )*/
    return (
        <>
        <h1>Forum</h1>
		<div className="body_part">
			<div className="zone_informations"><h2>Informations</h2>
			</div>
			<div className="zone_messages">
				<div className="liste_messages"><ListMessages/>
				</div>
			</div>
		</div>
        </>
    );
    
    
	//ForumAdmin accessible que si utilisateur admin

   

}

/*
<Router >
          <Routes>
            <Route path="/public" element={<ForumPublic/>}/> 
            <Route path="/admin" element={<ForumAdmin/>}/>
          </Routes>
        </Router>
*/
  
export default Forum ;