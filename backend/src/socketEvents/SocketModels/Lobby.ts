import Player from "./Player";

/**
 * This class represents the lobby model that player sockets would use.
 * This class is used to store the lobby information such as the players in it, the host and the codeBlock.
 */
class Lobby {
  private players: Player[];
  private lobbyID: string;
  private host: Player | null;
  private started: boolean;
  private codeBlockId: string;
  private codeBlockLength: number;

  constructor() {
    this.players = [];
    this.lobbyID = this.generateRandomID().toUpperCase();
    this.host = null;
    this.started = false;
    this.codeBlockId = "";
    this.codeBlockLength = 0;
  }

  public setCodeBlockId(codeBlockId: string): void {
    this.codeBlockId = codeBlockId;
  }

  public getCodeBlockId(): string {
    return this.codeBlockId;
  }

  public setStarted(started: boolean) {
    this.started = started;
  }

  public getStarted(): boolean {
    return this.started;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(player: Player) {
    this.players = this.players.filter(p => p.getSocketID() !== player.getSocketID());
  }

  public generateRandomID(): string {
    return Math.random().toString(36).substring(7);
  }

  public generateRandomUserName(): string {
    return `Uaena_${this.players.length + 1}`;
  }

  public getLobbyID(): string {
    return this.lobbyID.toUpperCase();
  }

  public setHost(player: Player) {
    this.host = player;
  }

  public getHost(): Player | null {
    return this.host;
  }

  public getPlayerBySocketID(socketID: string): Player | null {
    return this.players.find(p => p.getSocketID() === socketID) || null;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public orderPlayersByRating(): void {
    // sort this.players first by their player.getStats().accuracy * this.codeBlockLength and then by their player.getStats().timeLeftInSeconds
    this.players.sort((a, b) => {
      if (a.getStats().Accuracy * this.codeBlockLength > b.getStats().Accuracy * this.codeBlockLength) {
        return -1;
      } else if (a.getStats().Accuracy * this.codeBlockLength < b.getStats().Accuracy * this.codeBlockLength) {
        return 1;
      } else {
        const aTime = a.getStats().timeLeftInSeconds;
        const bTime = b.getStats().timeLeftInSeconds;

        if (aTime === undefined || bTime === undefined) {
          return 0;
        }
        else if (aTime > bTime) {
          return -1;
        } else if (aTime < bTime) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  public setCodeBlockLength(length: number) {
    this.codeBlockLength = length;
  }

  public getCodeBlockLength() {
    return this.codeBlockLength;
  }
}

export default Lobby;