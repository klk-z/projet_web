import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReplyItem({ user, reply }) {
    const [showReplies, setShowReplies] = useState(false);
    const [nestedReplies, setNestedReplies] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false); // Nouvel état pour afficher ou masquer le formulaire de réponse

    useEffect(() => {
        fetchNestedReplies();
    },[]);
    
    const handleShowReplies = async () => {
        setShowReplies(!showReplies); // Inverse la valeur de showReplies directement
    
        // Si showReplies est vrai, récupère les réponses imbriquées
        if (!showReplies) {
            await fetchNestedReplies();
        }
    };

    const fetchNestedReplies = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/reply/${reply._id}/replies`);
            setNestedReplies(response.data);
            console.log(response.data);
            console.log('length: ', nestedReplies.length);
        } catch (error) {
            console.error('Erreur lors de la récupération des réponses imbriquées :', error);
        }
    };

    const postNestedReply = async () => {
        const nestedReplyData = {
            content: replyContent,
            author: user.username,
            date: new Date(),
            isReplyTo: reply._id
        };

        try {
            const response = await axios.post(`http://localhost:4000/api/reply/reply`, nestedReplyData);
            if (response.status === 201) {
                console.log("Réponse imbriquée créée avec succès", response.data);
                fetchNestedReplies();
                setReplyContent('');
                setShowReplyForm(false); // Masquer le formulaire après la soumission de la réponse
            } else {
                throw new Error('Erreur lors de la création de la réponse imbriquée');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réponse imbriquée :', error);
        }
    };

    return (
        <div className="reply">
            <p>{reply.content}</p>
            <p>By: {reply.author}</p>
            <p>Date: {new Date(reply.date).toLocaleDateString()}</p>
            {nestedReplies && nestedReplies.length > 0 && (
                <div>
                    <button onClick={handleShowReplies}>Show Nested Replies</button>
                    {showReplies && (
                        <div className="nested-replies">
                            {nestedReplies.map((nestedReply, index) => (
                                <ReplyItem user={user} reply={nestedReply} key={index} />
                            ))}
                        </div>
                    )}
                </div>
            )}
            {showReplyForm && ( // Afficher le formulaire de réponse uniquement si showReplyForm est vrai
                <div>
                    <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
                    <button onClick={postNestedReply}>Post Nested Reply</button>
                </div>
            )}
            <button onClick={() => setShowReplyForm(prevState => !prevState)}>{showReplyForm? "Cancel" : "Reply"}</button> {/* Bouton pour afficher ou masquer le formulaire de réponse */}
        </div>
    );
}

export default ReplyItem;
