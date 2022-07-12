import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, CircularProgress, Toolbar, Typography } from "@mui/material";
import styles from "./Header.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "2.5rem",
  color: theme.palette.primary.contrastText,
}));

const HeaderButton = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "2rem",
  textAlign: "right",
  "&:hover": {
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
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  console.log("Authenticated: " + isAuthenticated);

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar className={styles.headerContainer}>
          <Link to="/" className={styles.logoContainer}>
            {/* <Icon>$</Icon> */}
            <Name>KYCF Racer</Name>
          </Link>
          {isLoading ? (
            <CircularProgress />
          ) : isAuthenticated ? (
            <div className={styles.headerButtonContainer}>
              <HeaderButton
                sx={{ marginRight: 4 }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </HeaderButton>
              <HeaderButton
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </HeaderButton>
            </div>
          ) : (
            <div></div>
            // <HeaderButton onClick={() => loginWithRedirect()}>
            //   Login
            // </HeaderButton>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Header;
