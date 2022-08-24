import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./api/sockets/Sockets";
import Routes from "./pages/Routes/Routes";
import theme from "./utils/Theme";
import { Auth0Provider } from "@auth0/auth0-react";

/**
 * The main application component containing all the required context providers.
 * @constructor
 */
function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  if (domain === undefined || clientId === undefined) {
    throw new Error("Please set the environment variables");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="openid email profile"
      responseType="code"
    >
      <SocketContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </SocketContextProvider>
    </Auth0Provider>
  );
}

export default App;
