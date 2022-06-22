import React from "react";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import SoloGamePage from "../SoloGamePage/SoloGamePage";
import MultiplayerGamePage from "../MultiplayerGamePage/MultiplayerGamePage";
import LobbyPage from "../LobbyPage/LobbyPage";
import Header from "../../components/Header/Header";
import GameEndPage from "../GameEndPage/GameEndPage";
import HomePage from "../HomePage/HomePage";
import ProfilePage from "../ProfilePage/ProfilePage";

/**
 * This is the router manager for the application which handles routing for the application.
 * @constructor
 */
function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Header />}>
        <Route path="solo" element={<SoloGamePage />} />
        <Route path="multiplayer" element={<MultiplayerGamePage />} />
        <Route path="lobby" element={<LobbyPage />} />
        <Route path="results" element={<GameEndPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route index element={<HomePage />} />

        {/* If an invalid link is input, re-direct to main page. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Switch>
  );
}

export default Routes;
