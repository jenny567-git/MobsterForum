import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const {
      user,
      isAuthenticated,
      loginWithRedirect,
      logout,
  } = useAuth0();
  
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
  });

  return (
    <div>
        {!isAuthenticated && ( <button onClick={() => loginWithRedirect()}>Log In</button>)}
        {isAuthenticated && (<button onClick={() => logoutWithRedirect()}>Log out</button>)}
        {!isAuthenticated && (<button type="button" onClick={() => loginWithRedirect()}>Register</button>)}
    </div>
)
};

export default LoginButton;