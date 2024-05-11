import React from 'react'
import { useState } from 'react'
import ListMessages from './ListMessages.jsx'
import NewUsers from './NewUsers.jsx'
import './App.css'



function Forum({user, changePage}) {
    const [admin, setAdmin] = useState(false);

	const handleSwitch = () => {
		setAdmin(admin == false ? true : false);
	};
    

    return (
        <>
        <h1>Forum</h1>
		<div className="forum-container">
		<div className="panel_left">
			{user.isAdmin ?(
				<button className='forum_switch' onClick={() => handleSwitch()}>
				{admin == true ? '>forum<' : '>admin<'}
			</button>
			) : (<></>
			)}
			{admin ? 
			<div className="zone_verification">
				<NewUsers/>
			</div>:<></>}
			<div className="zone_informations">
				<h2>Informations</h2>
			</div>
		</div>
		<div className="zone_messages">
			<div className="liste_messages">
				<ListMessages adminMode={admin} user={user} changePage={changePage}/>
			</div>
		</div>
		</div>
        </>
    );
    
    
	//ForumAdmin accessible que si utilisateur admin

   

}

/*
<Router >
          <Routes>
            <Route path="/public" element={<ForumPublic/>}/> 
            <Route path="/admin" element={<ForumAdmin/>}/>
          </Routes>
        </Router>
*/
  
export default Forum ;