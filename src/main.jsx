import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './frontend/App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import ('dotenv/config')

const domain = process.env.AUTH0_DOMAIN

console.log('Domain:', domain);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Auth0Provider 
  domain={domain}
  clientId= "process.env.CLIENT_Id"
  authorizationParams={{
    redirect_uri:"http://localhost:5173/newtodo",
    audience: "https://dev-gdy3ffogfy1nj7co.us.auth0.com/api/v2/",
    scope: "read:current_user update:current_user_metadata"
   }}
   >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
)
