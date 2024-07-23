import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './frontend/App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Auth0Provider 
   domain="dev-qwqg11xx4qavwerk.us.auth0.com"
   clientId="hfTyVweJnTj2sFnlZIyi8HzsGbC25qvR"
   authorizationParams={{
     redirect_uri: window.location.origin
   }}
   >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
)
