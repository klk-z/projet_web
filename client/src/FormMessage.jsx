import { useState } from 'react'
import './App.css'



function FormMessage({onAdd}) {

    function submitMessage(e){
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        // author temporaire
        return (onAdd({title: title, content: content, author: "Sharon", date: new Date()}))

    }
    

    return (
        <>
		<form onSubmit={submitMessage} id="formMessage">
        <h2>Share your thoughts</h2>
        <input type="text" name="title" id="title" placeholder="title" required/> <br></br>
        <textarea type="text" name="content" id="content" placeholder="content" required /> <br></br>
        <button type="submit" value="Submit" >Post</button>
      </form>
        </>
    );
}


  
export default FormMessage ;