import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileInformation = ({ setIsAuthorized }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isAuthenticated } = useAuth0();

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

    if (loggedInUser.roles.includes("admin")) {
      setIsAuthorized(true);
      setIsLoggedIn(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

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

  const deactivateAccount = () => {
    axios.post(
      "https://localhost:44304/api/User/ToggleUserActive?authId=" + user.sub
    );
  };
  //const [user2, setuser] = useLocalStorage('user', null)

  const [newEmail, setEmail] = useState("");

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
            <button className="mobster-std-btn" onClick={deactivateAccount}>
              Deactivate my account.
            </button>
            <p>This will deactivate your account</p>
            <p>If you wish to be permanently removed</p>
            <p>contact us on contact.mobsterforum@gmail.com</p>
       
       
            </div>
          <div classname="to-right">
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
                <button className="mobster-std-btn" onClick={changePassword}>
                  Change password. You will be redirected.
                </button>
              </div>
            </form>
          </div>
        </div>
     </div>
  );
};

export default ProfileInformation;
