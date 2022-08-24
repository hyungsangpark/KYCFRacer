import { MultiplayerSettings } from "./GameTypes";
import { CodeBlock } from "./ApiTypes";

/**
 * This file contains the types for the socket events
 */

export type SocketContextType = {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  emitAnotherExampleEvent: (data: any) => void;
  onAnotherExampleEvent: (callback: (data: any) => void) => void;
  createLobby: (data: CreateLobbyDTO) => void;
  joinLobby: (data: JoinLobbyDTO) => void;
  leaveLobby: () => void;
  onCreateLobby: (callback: (data: CreateLobbyResponse) => void) => void;
  onJoinLobby: (callback: (data: PlayersResponse) => void) => void;
  readyLobby: (data: ReadyLobbyDTO) => void;
  updatePlayerProgress: (data: PlayerProgressDTO) => void;
  onUpdatePlayerProgress: (callback: (data: PlayersResponse) => void) => void;
  startGame: (data: StartGameDTO) => void;
  onStartGame: (callback: (data: StartGameResponse) => void) => void;
  getId: () => string | undefined;
  completeGame: (data: CompleteGameDTO) => void;
  onGameComplete: (callback: (data: PlayersResponse) => void) => void;
  removeListeners: () => void;
  onLobbyError: (callback: (data: ErrorResponse) => void) => void;
};

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
  players: Player[];
};

export interface StartGameResponse extends PlayersResponse {
  code: CodeBlock;
  language: string;
}

export type Player = {
  playerName: string;
  socketID: string;
  playerStats: PlayerStats;
  isReady: boolean;
  isHost: boolean;
  isMe?: boolean;
  profilePicture: string;
};

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

export type CodeBlockWIthId = {
  id?: string;
  codeBlock: string;
};
