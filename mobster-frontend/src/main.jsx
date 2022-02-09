import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './style-admin-dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import {StoreProvider} from './utils/store'
import { Auth0Provider } from "@auth0/auth0-react";

import { getConfig } from './config';

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: "http://localhost:3000/profile",
 
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
            <StoreProvider>
                <App />
            </StoreProvider>
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
