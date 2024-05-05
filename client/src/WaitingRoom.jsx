import React from 'react'
import { useState } from 'react'
import './App.css'
import Snake from './Snake.jsx'

function WaitingRoom({user}) {
    return (
        <>
            <h2>Bienvenue {/*user.name*/}</h2>
            <p>Votre profil est en train d'être vérifié par les administrateurs de Tell'IT.
                Si votre demande est accepté, vous serez alors redirigé.e vers la page de connection.
                En attendant :
            </p>
            {/*<Snake/>*/}
        </>
    )

}
export default WaitingRoom