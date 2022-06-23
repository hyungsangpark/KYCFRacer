import { ICodeBlock } from "../../models/CodeBlock";

/**
 * This file stores socket types for the messages going in and out of the server socket.
 */

export type CreateLobbyDTO = {
  playerName: string;
  sub?: string;
};

export type CreateLobbyResponse = {
  lobbyID: string;
};

export type JoinLobbyDTO = {
  playerName: string;
  lobbyID: string;
  sub?: string;
};

export type ErrorResponse = {
  error: string;
};

export type CompleteGameDTO = {
  lobbyID: string;
};

export type PlayersResponse = {
  players: PlayerResponse[];
};

export type PlayerResponse = {
  playerName: string;
  socketID: string;
  playerStats: PlayerStats;
  isReady: boolean;
  isHost: boolean;
  profilePicture: string;
};

export interface StartGameResponse extends PlayersResponse {
  code: ICodeBlock;
  language: string;
}

export type ReadyLobbyDTO = {
  lobbyID: string;
};

export type PlayerProgressDTO = {
  lobbyID: string;
  CPM: number;
  Accuracy: number;
  Errors: number;
  Progress: number;
  correctKeyCount?: number;
  wrongKeyCount?: number;
  timeLeftInSeconds?: number;
};

export type PlayerStats = {
  CPM: number;
  Accuracy: number;
  Errors: number;
  Progress: number;
  correctKeyCount?: number;
  wrongKeyCount?: number;
  timeLeftInSeconds?: number;
};

export type StartGameDTO = {
  lobbyID: string;
  settings: MultiplayerSettings;
};

export type MultiplayerSettings = {
  time: "30" | "60" | "90" | "120";
  language: "bible" | "kycf";
  playerAmount: 2 | 3 | 4 | 5;
};
