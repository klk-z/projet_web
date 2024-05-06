import React, { useState, useEffect } from 'react';
import Message from './Message.jsx'
import FormMessage from './FormMessage.jsx'
import './App.css'
import axios from 'axios'



function ListMessages({adminMode, search, user}) {
    // TODO :
    // mettre const message et form message dans forum ?
    // connecter au serveur
    // if adminMode : fetch les messages d'administrateurs
    // if search : fetch les messages qui correspondent
    const [messages, setMessages] = useState([
       {title: "Mario", content: "mon film est au cinéma", author: "itsameeeee", date : new Date()},
       {title: "Luigi", content: "c bizarre moi aussi", author: "itsameeeee2", date : new Date()},
       {title: "Peach", content: "Mario! Viens me sauver!!!!", author: "itsayouuu", date : new Date()}
       ])
        
    useEffect(() => {
    axios.get('http://localhost:4000/api/messages') 
        .then(response => {
            console.log(response.data)
            setMessages(response.data); // Met à jour l'état avec les données récupérées depuis le serveur
            console.log(messages)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des messages:', error);
        });
    }, []); // Le tableau vide en second argument assure que cette fonction est exécutée une seule fois lors du chargement initial du composant


    
    // TODO ajouter // supprimer message 
    function addMessage(newMessage){
        setMessages([newMessage,...messages])
    }

    
    return (
        <>
            <FormMessage onAdd={addMessage} user={user} />
            <h2>Latest posts</h2>
            <ul id="list_messages">
                {messages.map((message, index) => (
                    <li key={index}>
                        <Message
                            title={message.title}
                            content={message.content}
                            author={message.author}
                            date={new Date(message.date)}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
    //user temporaire
    /*
    return (
        <>
        <FormMessage onAdd={addMessage} user={user}/> 
        <h2>Latest posts</h2>
        <ul id="messages">
            {messages.map((message, index) => <li key={index}>
            <Message title={message.title} content={message.content} author={message.author} date={message.date}/>
            </li>)}
        </ul>
        </>
    );*/
}


  
export default ListMessages ;