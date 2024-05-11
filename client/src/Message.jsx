import React from 'react'
import { useState } from 'react'
import './App.css'



function Message({ title, content, author, date, changePage}) {
    return (
      <div className="message">
        <h3>{title}</h3>
        <p>{content}</p>
        <div>
          <span onClick={ () => changePage("profile_page", author)} >@{author} </span>
          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>
    );
}


  
export default Message ;