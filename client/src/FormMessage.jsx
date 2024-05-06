import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import './App.css'



function FormMessage({onAdd, user}) {
    /*
    function submitMessage(e){
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        // author temporaire
        return (onAdd({title: title, content: content, author: user.username, date: new Date()}))
    }*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const content = e.target.content.value

        const messageData = {
            title: title,
            content: content,
            author: user.username,
            date: new Date(),
            isAdmin: user.isAdmin
        };

        try {
            const response = await axios.post('http://localhost:4000/api/message', messageData);

            if (response.status === 201) {
                console.log("Message créé avec succès", response.data);
                onAdd(messageData);
            } else {
                throw new Error('Erreur lors de la création du message');
            }
        } catch (error) {
            console.log("Une erreur s'est produite lors de la création de votre message:", error);
        }
    };

    return (
        <>
		<form onSubmit={handleSubmit} id="formMessage">
        <h2>Share your thoughts</h2>
        <input type="text" name="title" id="title" placeholder="title" required/> <br></br>
        <textarea type="text" name="content" id="content" placeholder="content" required /> <br></br>
        <button type="submit" value="Submit">Post</button>
      </form>
        </>
    );
}


  
export default FormMessage ;