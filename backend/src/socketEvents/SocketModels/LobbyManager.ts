import Lobby from "./Lobby";
import Player from "./Player";

/**
 * This is a class that is used to create and close lobbies as well as add/remove players.
 */
class LobbyManager {
  private lobbies: Map<string, Lobby>;

  constructor() {
    this.lobbies = new Map();
  }

  public createNewLobby(): string {
    let lobby;

    while (!lobby) {
      lobby = new Lobby();

      if (this.lobbies.has(lobby.getLobbyID())) {
        lobby = null;
      }
    }

    this.lobbies.set(lobby.getLobbyID().toUpperCase(), lobby);
    return lobby.getLobbyID();
  }

  public setHost(lobbyID: string, host: Player) {
    if (this.lobbies.has(lobbyID)) {
      this.lobbies.get(lobbyID)!.setHost(host);
    }
  }

  public addPlayer(lobbyID: string, player: Player) {
    if (this.lobbies.has(lobbyID)) {
      const lobby = this.lobbies.get(lobbyID);

      if (player.getPlayerName() === "") {
        player.setPlayerName(lobby!.generateRandomUserName());
      }

      lobby!.addPlayer(player);
    }
  }

  public removePlayer(lobbyID: string, player: Player) {
    if (this.lobbies.has(lobbyID)) {
      this.lobbies.get(lobbyID)!.removePlayer(player);
    }
  }

  public getLobby(lobbyID: string): Lobby | undefined {
    if (this.lobbies.has(lobbyID.toUpperCase())) {
      return this.lobbies.get(lobbyID.toUpperCase())!;
    }
  }

  public getLobbyByPlayerSocketID(playerSocketID: string): {lobby: Lobby, player: Player} | undefined {
    for (const lobby of this.lobbies.values()) {
      const player = lobby.getPlayerBySocketID(playerSocketID);

      if (player) {
        return {
          lobby,
          player
        };
      }
    }
  }

  public closeLobby(lobbyID: string) {
    this.lobbies.delete(lobbyID);
  }
}

export default LobbyManager;