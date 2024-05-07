import React from 'react';

function NewUserItem({ user, onApprove, onReject }) {
    const handleApprove = () => {
        onApprove(user._id); // Appeler la fonction onApprove avec l'ID de l'utilisateur
    };

    const handleReject = () => {
        onReject(user._id); // Appeler la fonction onReject avec l'ID de l'utilisateur
    };

    return (
        <li>
            <span>{user.username}</span>
            <button onClick={handleApprove}>OK</button>
            <button onClick={handleReject}>Non</button>
        </li>
    );
}

export default NewUserItem;
