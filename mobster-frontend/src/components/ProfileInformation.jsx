import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileInformation = ({ setIsAuthorized }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [isActive, setIsActive] = useState(true);
  const [newEmail, setEmail] = useState("");


  useEffect(async () => {
    //add user to our database
    let userObj = {
      userName: user["https://rules.com/claims/user_metadata"].username,
      AuthId: user.sub,
      Id: user["https://rules.com/claims/user_metadata"].uuid,
    };
    let userActive = await axios.post(`https://localhost:44304/api/User`, userObj);
    console.log(userActive);
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
    console.log(user.sub);
    axios
      .post("https://localhost:44304/api/User/ChangePassword?sub=" + user.sub)
      .then((response) => {
        window.location.href = response.data;
      });
  };
  const changeEmail = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${newEmail}`);
    axios.post(
      "https://localhost:44304/api/User/ChangeUserEmail?sub=" +
        user.sub +
        "&email=" +
        newEmail
    );
    //https://localhost:44304/api/User/ChangeUserEmail?sub=subbbb&email=emailjlsss
  };

  const deactivateAccount = async () => {
    let response = await axios.post(
      "https://localhost:44304/api/User/ToggleUserActive?authId=" + user.sub
      
    );
    console.log(response);
    if(response.data.isActive)
    {
      setIsActive(true);
      console.log(response);
      alert("You reactivated your account");
    }
    else{
      setIsActive(false);
      console.log(response);
      alert("You deactivated your account");
    }
   
  };
  //const [user2, setuser] = useLocalStorage('user', null)

  
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
     </div>
  );
};

export default ProfileInformation;
