import React from "react";
import {styled} from "@mui/material/styles";
import {AppBar, CircularProgress, Toolbar, Typography} from "@mui/material";
import styles from "./Header.module.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const Icon = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  color: theme.palette.primary.light,
  fontSize: "36px",
  paddingRight: "16px",
}));

const Name = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  fontSize: "32px",
  color: theme.palette.secondary.light,
}));

const HeaderButton = styled(Typography)(({theme}) => ({
  color: theme.palette.secondary.light,
  fontSize: "21px",
  textAlign: "right",
  '&:hover': {
    cursor: "pointer",
  },
}));

/**
 * This component is used to display the header of the application. It includes the logo, name (which will redirect the
 * user to the main page when clicked), and login/logout button.
 *
 * @constructor
 */
function Header() {
  const navigate = useNavigate();
  const {isLoading, isAuthenticated, loginWithRedirect, logout} = useAuth0();

  console.log("Authenticated: " + isAuthenticated);

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar className={styles.headerContainer}>
          <Link to="/" className={styles.logoContainer}>
            <Icon>$</Icon>
            <Name>CodeRacer</Name>
          </Link>
          {
            isLoading ?
              <CircularProgress/>
              :
              isAuthenticated ?
                <div className={styles.headerButtonContainer}>
                  <HeaderButton sx={{marginRight: 4}} onClick={() => navigate("/profile")}>Profile</HeaderButton>
                  <HeaderButton onClick={() => logout({returnTo: window.location.origin})}>Logout</HeaderButton>
                </div>
                :
                <HeaderButton onClick={() => loginWithRedirect()}>Login</HeaderButton>
          }
        </Toolbar>
      </AppBar>
      <Outlet/>
    </>
  );
}

export default Header;
