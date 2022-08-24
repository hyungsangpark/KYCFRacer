import React, {
  useState,
  createContext,
  ReactChildren,
  ReactChild,
} from "react";
import io, { Socket } from "socket.io-client";
import {
  CompleteGameDTO,
  CreateLobbyDTO,
  CreateLobbyResponse,
  ErrorResponse,
  JoinLobbyDTO,
  PlayerProgressDTO,
  PlayersResponse,
  ReadyLobbyDTO,
  SocketContextType,
  StartGameDTO,
  StartGameResponse,
} from "../../utils/Types/SocketTypes";

export const SocketContext = createContext<SocketContextType | null>(null);

interface AuxProps {
  children: any;
}

export function SocketContextProvider({ children }: AuxProps) {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);

  const getId = () => {
    return socket?.id;
  };

  const emitAnotherExampleEvent = (data: string) => {
    socket?.emit("anotherExampleEvent", data);
  };

  const onAnotherExampleEvent = (callback: (data: string) => void) => {
    socket?.on("anotherExampleEvent", callback);
  };

  const createLobby = (data: CreateLobbyDTO) => {
    socket?.emit("createLobby", data);
  };

  const onCreateLobby = (callback: (data: CreateLobbyResponse) => void) => {
    socket?.on("lobbyCreated", callback);
  };

  const joinLobby = (data: JoinLobbyDTO) => {
    socket?.emit("joinLobby", data);
  };

  const onLobbyError = (callback: (data: ErrorResponse) => void) => {
    socket?.on("lobbyError", callback);
  };

  const completeGame = (data: CompleteGameDTO) => {
    socket?.emit("completeGame", data);
  };

  const onGameComplete = (callback: (data: PlayersResponse) => void) => {
    socket?.on("gameComplete", callback);
  };

  const onJoinLobby = (callback: (data: PlayersResponse) => void) => {
    socket?.on("lobbyJoined", callback);
  };

  const readyLobby = (data: ReadyLobbyDTO) => {
    socket?.emit("readyLobby", data);
  };

  const updatePlayerProgress = (data: PlayerProgressDTO) => {
    socket?.emit("updatePlayerProgress", data);
  };

  const onUpdatePlayerProgress = (
    callback: (data: PlayersResponse) => void
  ) => {
    socket?.on("playerProgressUpdate", callback);
  };

  const startGame = (data: StartGameDTO) => {
    socket?.emit("startGame", data);
  };

  const onStartGame = (callback: (data: StartGameResponse) => void) => {
    socket?.on("gameStart", callback);
  };

  const leaveLobby = () => {
    socket?.emit("leaveLobby");
  };

  const removeListeners = () => {
    socket?.off("lobbyCreated");
    socket?.off("lobbyJoined");
    socket?.off("playerProgressUpdate");
    socket?.off("gameStart");
    socket?.off("gameComplete");
  };

  const connect = () => {
    const newSocket = io(`${process.env.REACT_APP_SOCKET_IO}`, {
      transports: ["websocket"],
    });

    setSocket(newSocket);
    setConnected(true);
  };

  const disconnect = () => {
    leaveLobby();

    socket?.disconnect();
    setSocket(undefined);
    setConnected(false);
  };

  const context: SocketContextType = {
    // values
    connected,

    // functions
    getId,
    connect,
    disconnect,
    emitAnotherExampleEvent,
    createLobby,
    joinLobby,
    onLobbyError,
    leaveLobby,
    readyLobby,
    updatePlayerProgress,
    startGame,
    completeGame,
    removeListeners,

    // listeners
    onAnotherExampleEvent,
    onCreateLobby,
    onJoinLobby,
    onUpdatePlayerProgress,
    onStartGame,
    onGameComplete,
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
}
