import React, { useState, useEffect } from "react";
import Message from "./Message.jsx";
import FormMessage from "./FormMessage.jsx";
import "./App.css";
import axios from "axios";

function ListMessages({ adminMode, user, changePage }) {
  // TODO :
  // mettre const message et form message dans forum ?
  // connecter au serveur
  // if adminMode : fetch les messages d'administrateurs
  // if search : fetch les messages qui correspondent
  const [isForm, setIsForm] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let url = "http://localhost:4000/api/messages";

    if (adminMode) {
      url = "http://localhost:4000/api/messages/admins"; // URL pour les messages d'administrateurs
    }

    axios
      .get(url)
      .then((response) => {
        console.log('liste messages : ' , response.data);
        setMessages(response.data); // Met à jour l'état avec les données récupérées depuis le serveur
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages:", error);
      });
  }, [adminMode]); //est chargé lorsque que adminMode change

  // TODO ajouter // supprimer message
  function addMessage(newMessage) {
    setMessages([newMessage, ...messages]);
  }
  const handleSwitch = () => {
    setIsForm(isForm == false ? true : false);
  };

  return (
    <>
      <button className="form_switch" onClick={() => handleSwitch()}>
        {isForm == false ? "Poster un message" : "Annuler"}
      </button>
      {isForm ? <FormMessage onAdd={addMessage} user={user} /> : <></>}
      <ul id="list_messages" className="no-bullets">
        {messages.map((message, index) => (
          <li key={index}>
            <Message
              title={message.title}
              content={message.content}
              author={message.author}
              date={new Date(message.date)}
              id={message._id}
              changePage={changePage}
              user={user}
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

export default ListMessages;
