import React from 'react'
import { useState } from 'react'
import './App.css'



function Message({ title, content, author, date }) {
    return (
      <div className="message">
        <h3>{title}</h3>
        <p>{content}</p>
        <div>
          <span>Author: {author} </span>
          <span>Date: {date.toLocaleDateString()}</span>
        </div>
      </div>
    );
}


  
export default Message ;