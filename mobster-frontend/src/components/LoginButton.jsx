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
  const logoutWithRedirect = () =>{
    logout({
      returnTo: window.location.origin,
    });
    localStorage.removeItem("user");
  }
    
  if(isLoading) return <>Loading</>

  return (
    <div>
        {!isAuthenticated && ( <button onClick={() => loginWithRedirect()}><p>Log In</p></button>)}
        {!isAuthenticated && (<button onClick={() => loginWithRedirect({screen_hint: "signup"})}><p>Register</p></button>)}
        <Link to="/profile">{isAuthenticated && (<button onClick={() => Navigate }>Profile</button>)}</Link>
        {isAuthenticated && (<button onClick={() => logoutWithRedirect()}><p>Log out</p></button>)}
    </div>
)
};

export default LoginButton;