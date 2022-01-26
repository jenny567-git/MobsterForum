import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileInformation = () => {
  const {
      user,
      isAuthenticated,
  } = useAuth0();

  return (
    <div>
        <p>This is the profile infor component.</p>
        <p>{JSON.stringify(user)}</p>
    </div>
)
};

export default ProfileInformation;