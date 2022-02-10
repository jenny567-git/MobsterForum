import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../config";

const ProfileInformation = ({setIsAuthorized}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {
      user,
      isAuthenticated,
      getAccessTokenSilently,
      getIdTokenClaims
  } = useAuth0();

  const config = getConfig();

  useEffect(() => {

    //add user to our database
    let userObj = {
      userName: user["https://rules.com/claims/user_metadata"].username,
      AuthId: user.sub,
      Id: user["https://rules.com/claims/user_metadata"].uuid,
    };
    axios.post(`https://localhost:44304/api/User`, userObj);
    
    //store user in local storage
    let loggedInUser = {
      userName: user["https://rules.com/claims/user_metadata"].username,
      authId: user.sub,
      userId: user["https://rules.com/claims/user_metadata"].uuid,
      roles: user["https://rules.com/claims/user_metadata"].roles,
      email: user.email,
      updatedAt: user.updated_at,
    };
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    if(loggedInUser.roles.includes('admin')){
      setIsAuthorized(true);
      setIsLoggedIn(true);
    }
    else {
      setIsAuthorized(false);
    }
    getToken();
    getIdToken();
  }, []);

  const getToken = async () => {
    const token = await getAccessTokenSilently({
      audience: config.audience,
    });
    console.log(token);
  }

  const getIdToken = async () => {
    const token = await getIdTokenClaims({
      audience: config.audience,
    });
    console.log(token);
  }
  
  const changePassword = async () => {
	  console.log(user.sub)
    axios.post("https://localhost:44304/api/User/ChangePassword?sub=" + user.sub).then((response) => {window.location.href = response.data})

  };
  const changeEmail = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${newEmail}`);
    axios.post("https://localhost:44304/api/User/ChangeUserEmail?sub="+ user.sub +"&email=" + newEmail);
    //https://localhost:44304/api/User/ChangeUserEmail?sub=subbbb&email=emailjlsss
  };

  const deactivateAccount = () => {
    axios.post("https://localhost:44304/api/User/ToggleUserActive?authId=" + user.sub);
  }
  //const [user2, setuser] = useLocalStorage('user', null)

  const [newEmail, setEmail] = useState("");

  return (
    <div className="=">
      <div style={{ width: "40%", margin: "0 auto" }}>
        <div className="d-flex  flex-column border flex-fill">
          <div className="d-flex flex-row border justify-content-center">
            <div className="p-2 ">Username: </div>
            <div className="p-2">{user["https://mobster.com/username"]}</div>
          </div>
          <div className="d-flex flex-row border justify-content-center">
            <div className="mr-auto p-2">Email: </div>
            <div className="p-2 ">{user.email}</div>
          </div>
          <div className="d-flex flex-row justify-content-center mobster-std-container">
            <Link to="/admin-dashboard">{ isLoggedIn && (<button className="mobster-std-btn" >Admin Dashboard</button>)}</Link>
          </div>
        </div>
        <div className="d-flex flex-column">
          <button className="button" onClick={changePassword}>
            Change password. You will be redirected. 
          </button>
          <form onSubmit={changeEmail}>
            <label>
              Enter your new email:
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <input type="submit" value="Change my email.">
				</input>
          </form>

          <button className="button" onClick={deactivateAccount}>
            Deactivate my account.
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
