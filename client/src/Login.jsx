import React from "react";
import { useState } from "react";
import "./App.css";

function Login({ login, changePage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /*
    async function try_login(){
        try {
            await axios.get("http://localhost:4000/api/user/login", {
                params: {
                    username: username,
                    password: password
                }
            })
        }catch(err){
            console.log(err)
        }
        login();
    }
   
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:4000/api/user/login", {
                login: username,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };*/

  return (
    <>
      <h1>Se connecter</h1>
      <form onSubmit={login} id="login_form">
        <label htmlFor="chp_login">Nom d'utilisateur</label>
        <input
          id="chp_login"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label htmlFor="chp_pwd">Mot de passe</label>
        <input
          id="chp_pwd"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="on"
          required
        />
        <button type="submit">Connexion</button>
        <button type="reset">Annuler</button>
      </form>
      <button onClick={() => changePage("signin_page")}>Pas de compte?</button>
    </>
  );
}

export default Login;
