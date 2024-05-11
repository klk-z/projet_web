import React from 'react'
import { useState, useEffect } from 'react'
import Message from './Message';
import './App.css'
import axios from 'axios';

function ProfilePage({user, usernameProfile, changePage }) {
    const [userData, setUserData] = useState(null);
    const [userMessages, setUserMessages] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les données de l'utilisateur
        const fetchUserData = async () => {
            axios.get(`http://localhost:4000/api/user/${usernameProfile}`)
            .then(response => {
                console.log(response.data)
                setUserData(response.data); // Met à jour l'état avec les données récupérées depuis le serveur
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
            })
        };
    
        // Appel de la fonction pour récupérer les données de l'utilisateur
        fetchUserData();
    
        
        // Fonction pour récupérer tous les messages de l'utilisateur
        const fetchUserMessages = async () => {
            axios.get(`http://localhost:4000/api/user/${usernameProfile}/messages`)
            .then(response => {
                console.log(response.data);
                setUserMessages(response.data); // Met à jour l'état avec les données récupérées depuis le serveur
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des messages de l\'utilisateur :', error);
            })
        };
    
        // Appel de la fonction pour récupérer les messages de l'utilisateur
        fetchUserMessages();

    }, [usernameProfile]); // Exécuter l'effet lorsque le nom d'utilisateur change
    
    return (
        <div>
            <button onClick={ () => changePage("forum") }>{'<'}</button>
            {userData && (
                <div>
                    <h2>Profil de @{userData.username}</h2>
                    <p>Nom : {userData.lastname}</p>
                    <p>Prénom : {userData.firstname}</p>
                     {/*Affichage des autres attributs de l'utilisateur */}
                </div>
            )}

            <h3>Messages de l'utilisateur :</h3>
            <ul id="list_messages" className="no-bullets">
                {userMessages.map((message, index) => (
                    <li key={index}>
                        <Message
                            title={message.title}
                            content={message.content}
                            author={message.author}
                            date={new Date(message.date)}
                            id = {message._id}
                            changePage = {changePage}
                            user = {user}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfilePage;
