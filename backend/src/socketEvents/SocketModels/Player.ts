import { PlayerStats } from "./SocketTypes";

/**
 * This class represents the player socket such as their live stats.
 */
class Player {
  private socketID: string;
  private sub: string;
  private roomId: string;
  private playerName: string;
  private isHost: boolean;
  private isReady: boolean;
  private CPM: number;
  private accuracy: number;
  private errors: number;
  private progress: number;
  private finished: boolean;
  private profilePicture: string;
  private correctKeyCount?: number;
  private wrongKeyCount?: number;
  private timeLeftInSeconds?: number;

  constructor(
    socketID: string,
    roomId: string,
    playerName: string,
    isHost: boolean
  ) {
    this.socketID = socketID;
    this.roomId = roomId;
    this.playerName = playerName;
    this.isHost = isHost;
    this.isReady = false;
    this.finished = false;
    this.sub = "";
    this.profilePicture = "";

    this.CPM = 0;
    this.accuracy = 0;
    this.errors = 0;
    this.progress = 0;
    this.correctKeyCount = 0;
    this.wrongKeyCount = 0;
    this.timeLeftInSeconds = 0;
  }

  public getProfilePicture(): string {
    return this.profilePicture;
  }

  public setProfilePicture(profilePicture: string): void {
    this.profilePicture = profilePicture;
  }

  public setSub(sub: string) {
    this.sub = sub;
  }

  public getSub(): string {
    return this.sub;
  }

  public setFinished(finished: boolean) {
    this.finished = finished;
  }

  public isFinished(): boolean {
    return this.finished;
  }

  public getStats(): PlayerStats {
    return {
      CPM: this.CPM,
      Accuracy: this.accuracy,
      Errors: this.errors,
      Progress: this.progress,
      correctKeyCount: this.correctKeyCount,
      wrongKeyCount: this.wrongKeyCount,
      timeLeftInSeconds: this.timeLeftInSeconds,
    };
  }

  public updateStats(newStats: PlayerStats) {
    this.CPM = newStats.CPM;
    this.accuracy = newStats.Accuracy;
    this.errors = newStats.Errors;
    this.progress = newStats.Progress;
    this.correctKeyCount = newStats.correctKeyCount;
    this.wrongKeyCount = newStats.wrongKeyCount;
    this.timeLeftInSeconds = newStats.timeLeftInSeconds;
  }

  public flipIsReady(): void {
    this.isReady = !this.isReady;
  }

  public getSocketID(): string {
    return this.socketID;
  }

  public getIsReady(): boolean {
    return this.isReady;
  }

  public getPlayerName(): string {
    return this.playerName;
  }

  public setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }
}

export default Player;
