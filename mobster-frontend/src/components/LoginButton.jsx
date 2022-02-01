import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginButton = () => {
  const {
      user,
      isLoading,
      isAuthenticated,
      loginWithRedirect,
      logout,
  } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
  });

  if(isLoading) return <>Loading</>

  return (
    <div>
        {!isAuthenticated && ( <button onClick={() => loginWithRedirect()}>Log In</button>)}
        {!isAuthenticated && (<button onClick={() => loginWithRedirect({screen_hint: "signup"})}>Register</button>)}
        <Link to="/profile">{isAuthenticated && (<button onClick={() => Navigate }>Profile</button>)}</Link>
        {isAuthenticated && (<button onClick={() => logoutWithRedirect()}>Log out</button>)}
    </div>
)
};

export default LoginButton;