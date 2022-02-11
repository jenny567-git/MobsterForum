import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthenticationHeader, getAudience } from "../CustomHooks/useAutenticationHeader";
import { ToastContainer, toast } from "react-toastify";


const ProfileInformation = ({ setIsAuthorized }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const [isActive, setIsActive] = useState(true);
  const [newEmail, setEmail] = useState("");

  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  }

  useEffect(async () => {
    //add user to our database
    let userObj = {
      userName: user["https://rules.com/claims/user_metadata"].username,
      AuthId: user.sub,
      Id: user["https://rules.com/claims/user_metadata"].uuid,
    };
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    let userActive = await axios.post(`https://localhost:44304/api/User`, userObj, header);
    setIsActive(userActive.data.isActive);

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

    if (loggedInUser.roles.includes("admin")) {
      setIsAuthorized(true);
      setIsLoggedIn(true);
    } else {
      setIsAuthorized(false);
    }

  }, [isActive]);

  const changePassword = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    axios.post(`https://localhost:44304/api/User/ChangePassword?sub=${user.sub}`, header)
    .then((response) => {window.location.href = response.data})
  };

  const changeEmail = async (event) => {
    event.preventDefault();
    // alert(`The name you entered was: ${newEmail}`);
    notify();
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    axios.post(`https://localhost:44304/api/User/ChangeUserEmail?sub=${user.sub}&email=${newEmail}`, header);
  };

  const deactivateAccount = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    let response = axios.post(`https://localhost:44304/api/User/ToggleUserActive?authId=${user.sub}`, header);
    if(response.data.isActive)
    {
      setIsActive(true);
    }
    else{
      setIsActive(false);
    }
   
  };
  const notify = () => toast(`The name you entered was: ${newEmail}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
    });
  
  return (
    
     <div className="profile-center">
        <div className="user-container flex-space">
          <div className="to-left">
          <h1>Profile Page</h1>
            <div className="user-details">
              <h6>Username: </h6>
              <h6>{user["https://mobster.com/username"]}</h6>
            </div>
            <div className="user-details">
              <h6>Email:</h6>
              <h6>{user.email}</h6>
            </div>
            {isActive && (<div>
              <button className="mobster-std-btn" onClick={deactivateAccount}>
                Deactivate my account.
              </button>
              <p>This will deactivate your account</p>
              <p>If you wish to be permanently removed</p>
              <p>contact us on contact.mobsterforum@gmail.com</p>
            </div>
            )}
            
             {!isActive && (<button className="mobster-std-btn" onClick={deactivateAccount}>
              Reactivate my account.
            </button>)}
            {!isActive && (<p>This will reactivate your account</p>)}
       
       
            </div>
          <div className="to-right">
          <Link to="/admin-dashboard">
              {isLoggedIn && (
                <button className="mobster-std-btn">Admin Dashboard</button>
              )}
            </Link>
            <form onSubmit={changeEmail}>
              <div className="change-email">
                <label>Enter your new email: </label>
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="mobster-std-btn" type="submit">Change my email</button>
               
              </div>
            </form>
            <button className="mobster-std-btn" onClick={changePassword}>
                  Change password. You will be redirected.
                </button>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
     </div>
  );
};

export default ProfileInformation;
