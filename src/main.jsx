import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './frontend/App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

const apiUrl = import.meta.env.DOMAIN;
const googleClientId = import.meta.env.CLIENTID;


console.log('API URL:', apiUrl);
console.log('Google Client ID:', googleClientId);

// Ensure you replace these with your actual Auth0 configuration
const domain = apiUrl;
const clientId = googleClientId;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Auth0Provider 
   domain={domain}
   clientId={clientId}
   authorizationParams={{
     redirect_uri: window.location.origin
   }}
   >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
)
