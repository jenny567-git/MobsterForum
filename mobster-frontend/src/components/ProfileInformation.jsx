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
    console.log(useAuth0.token)
    axios.post(`https://localhost:44304/api/User?authId=${user.sub}&userName=${user["https://mobster.com/username"]}`);
  }, []);

  return (
    <div className="=">
        <div style={{ width: '40%', margin: "0 auto" }}>
        <div  className="d-flex  flex-column border flex-fill">
            <div className="d-flex flex-row border justify-content-center">
                <div className="p-2 ">Username: </div>
                <div className="p-2">{user["https://mobster.com/username"]}</div>
            </div>
            <div className="d-flex flex-row border justify-content-center">
                <div className="mr-auto p-2">Email: </div>
                <div className="p-2 ">{user.email}</div>
            </div>
            
        </div>
        </div>
    </div>
)
};

export default ProfileInformation;