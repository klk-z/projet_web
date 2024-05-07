import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import NewUserItem from './NewUserItem';



function NewUsers() {
    
    const [users, setUsers] = useState([])
        
    useEffect(() => {
    axios.get('http://localhost:4000/api/users/new') 
        .then(response => {
            console.log(response.data)
            setUsers(response.data); // Met à jour l'état avec les données récupérées depuis le serveur
            console.log(users)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des users:', error);
        });
    }, []); // Le tableau vide en second argument assure que cette fonction est exécutée une seule fois lors du chargement initial du composant

    
    const handleApprove = (userId) => {
        /*
        // Mettre à jour l'utilisateur avec l'ID donné pour marquer newUser à false
        axios.put(`http://localhost:4000/api/user/${userId}`, { newUser: false , isBanned: false})
            .then(response => {
                // Mettre à jour la liste des utilisateurs après l'approbation
                setUsers(users.filter(user => user._id !== userId));
                console.log(response)
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur (approve):', error);
            });
            */
    };

    const handleReject = (userId) => {
        /*
        // Mettre à jour l'utilisateur avec l'ID donné pour marquer newUser à false et isBanned à true
        axios.put(`http://localhost:4000/api/user/${userId}`, { newUser: false, isBanned: true })
            .then(response => {
                // Mettre à jour la liste des utilisateurs après le rejet
                setUsers(users.filter(user => user._id !== userId));
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur (reject):', error);
            });*/
    }; 

    return (
        <>
            <h2>Nouveaux utilisateurs</h2>
            <ul id="list_new_users">
                {users.map((newuser, index) => (
                    <NewUserItem
                        key={index}
                        user={newuser}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))}
            </ul>
        </>
    );
}


  
export default NewUsers ;