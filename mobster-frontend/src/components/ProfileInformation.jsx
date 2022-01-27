import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react'

const ProfileInformation = () => {
  const {
      user,
      isAuthenticated,
  } = useAuth0();

  useEffect(() => {
    console.log("working");
    console.log(user);
  }, []);

  return (
    <div class="">
        <div class="d-flex flex-column border">
            <div class="d-flex flex-row border justify-content-center">
                <div class="p-2 border">Username: </div>
                <div class="p-2 border">{user.nickname}</div>
            </div>
            <div class="d-flex flex-row border justify-content-center">
                <div class="p-2 border">Email: </div>
                <div class="p-2 border">{user.email}</div>
            </div>
            
        </div>
    </div>
)
};

export default ProfileInformation;