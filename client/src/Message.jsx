import React, { useState, useEffect } from "react";
import axios from "axios";
import ReplyItem from "./ReplyItem";

function Message({ title, content, author, date, id, changePage, user }) {
  const [showReplies, setShowReplies] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");

  const handleShowReplies = () => {
    setShowReplies((prevState) => !prevState);
    fetchReplies();
  };

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/message/${id}/replies`
      );
      setReplies(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réponses :", error);
    }
  };

  const postReply = async () => {
    const replyData = {
      content: replyContent,
      author: user.username,
      date: new Date(),
      isReplyTo: id,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/message/reply`,
        replyData
      );
      if (response.status === 201) {
        console.log("Réponse créée avec succès", response.data);
        fetchReplies();
        setShowForm(false);
      } else {
        throw new Error("Erreur lors de la création de la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réponse :", error);
    }
  };

  const deleteMessage = async () => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:4000/api/message/${id}`
      );
      if (response.status === 201) {
        console.log("Message supprimé avec succès", response.data);
      } else {
        throw new Error("Erreur lors de la suppression :");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error);
    }
  };

  return (
    <div className="conversation">
      <div className="message">
        <h3>{title}</h3>
        <p>{content}</p>
        <div>
          <span>
            <button onClick={() => handleShowReplies()}>
              {showReplies ? "v Réponses" : "> Réponses"}
            </button>
          </span>
          <span>
            <a href="#" onClick={() => changePage("profile_page", author)}>
              @{author}
            </a>
          </span>
          <span>{date.toLocaleDateString()}</span>
          <span>
            <button onClick={() => setShowForm((prevState) => !prevState)}>
              Nouvelle réponse
            </button>
          </span>
          {author === user.username ? (
            <span>
              <button onClick={() => deleteMessage()}>Supprimer</button>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      {showReplies && (
        <div className="replies">
          <h4>Replies:</h4>
          {replies.map((reply, index) => (
            <ReplyItem
              user={user}
              key={index}
              reply={reply}
              changePage={changePage}
            />
          ))}
        </div>
      )}
      {showForm && (
        <div>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={postReply}>Poster</button>
        </div>
      )}
    </div>
  );
}

export default Message;
