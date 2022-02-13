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
        <div>
          {!isAuthenticated && ( <button onClick={() => loginWithRedirect()}><p>Log In</p></button>)}
          <Link to="/rules">{!isAuthenticated && (<button onClick={() =>Navigate}><p>Register</p></button>)}</Link>
          <Link to="/profile">{isAuthenticated && (<button onClick={() => Navigate}><p>Profile</p></button>)}</Link>
          {isAuthenticated && (<button onClick={() => logoutWithRedirect()}><p>Log out</p></button>)}
        </div>
        {/* <div className="logged-in-as"><p>Logged in as: {user["https://mobster.com/username"]}</p></div> */}

    </div>
)
};

export default LoginButton;