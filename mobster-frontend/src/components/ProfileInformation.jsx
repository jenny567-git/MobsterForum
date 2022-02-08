import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react'
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const ProfileInformation = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(true);
  const {
      user,
      isAuthenticated,
  } = useAuth0();

  useEffect(() => {
    console.log("working");

    let userObj = {
      userName: user["https://rules.com/claims/user_metadata"].username,
      AuthId: user.sub,
      Id: user["https://rules.com/claims/user_metadata"].uuid,
    };
    axios.post(`https://localhost:44304/api/User`, userObj);

    let loggedInUser = {
      userName: user["https://rules.com/claims/user_metadata"].username,
      authId: user.sub,
      userId: user["https://rules.com/claims/user_metadata"].uuid,
      roles: user["https://rules.com/claims/user_metadata"].roles,
      email: user.email,
      updatedAt: user.updated_at
    }
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    if(loggedInUser.roles.includes('admin')){
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

  

  return (
    <div className="=">
        <div className="d-flex flex-column border">
            <div className="d-flex flex-row border justify-content-center">
                <div className="p-2 border">Username: </div>
                <div className="p-2 border">{user.nickname}</div>
            </div>
            <div className="d-flex flex-row border justify-content-center">
                <div className="p-2 border">Email: </div>
                <div className="p-2 border">{user.email}</div>
            </div>
            <div className="d-flex flex-row justify-content-center mobster-std-container">
              <Link to="/admin-dashboard">{isLoggedIn && (<button className="mobster-std-btn" onClick="/admin-dashboard">Admin Dashboard</button>)}</Link>
            </div>
        </div>
    </div>
)
};

export default ProfileInformation;