import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react'
import axios from "axios";

const ProfileInformation = () => {
  const {
      user,
      isAuthenticated,
  } = useAuth0();

  useEffect(() => {
    console.log("working");
    //TODO: solve error 500
    axios.post(`https://localhost:44304/api/User?authId=${user.sub}&userName=${user["https://mobster.com/username"]}`);
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
            
        </div>
    </div>
)
};

export default ProfileInformation;