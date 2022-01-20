import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";

//import { getConfig } from "../config";
import { getConfig } from './config';



const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
 
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}
   
  >
    <App />
  </Auth0Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)
