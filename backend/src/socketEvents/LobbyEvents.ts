import {Server, Socket} from "socket.io";
import LobbyManager from "./SocketModels/LobbyManager";
import Player from "./SocketModels/Player";
import {
  CompleteGameDTO,
  CreateLobbyDTO,
  CreateLobbyResponse, ErrorResponse,
  JoinLobbyDTO,
  PlayerProgressDTO,
  PlayersResponse,
  ReadyLobbyDTO,
  StartGameDTO, StartGameResponse,
} from "./SocketModels/SocketTypes";
import Logger from "../util/Logger";
import CodeBlock from "../models/CodeBlock";
import Lobby from "./SocketModels/Lobby";
import MatchHistory from "../models/MatchHistory";
import mongoose from "mongoose";
import {MatchHistoryUser} from "../DTOs/ApiTypes";
import User from "../models/User";
import Avatar from "../models/Avatar";

/**
 * This file contains all the socket events associated with the lobby.
 */

/**
 * A message comes in from the client to create a new lobby,
 * a new player and lobby is created and that player is set as the host.
 * A list of players and lobby information is sent back.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function createLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("createLobby", async (createLobby: CreateLobbyDTO) => {
    const lobbyID = lobbyManager.createNewLobby();
    const host = new Player(socket.id, lobbyID, createLobby.playerName, true);

    createLobby.sub && host.setSub(createLobby.sub);

    await assignProfilePicture(host);

    lobbyManager.setHost(lobbyID, host);
    lobbyManager.addPlayer(lobbyID, host);

    socket.join(lobbyID.toUpperCase());

    const response: CreateLobbyResponse = {
      lobbyID
    };

    io.in(lobbyID).emit("lobbyCreated", response);
    io.in(lobbyID).emit('lobbyJoined', lobbyPlayersToResponse([host], host));
  })
}

/**
 * Connection attempt messages are sent to the server to join a specific lobby code.
 * If the code exists a new player is created and added to the socket room.
 * A list of players and lobby information is sent back.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function joinLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("joinLobby", async (joinLobby: JoinLobbyDTO) => {
    const lobby = lobbyManager.getLobby(joinLobby.lobbyID.toUpperCase());

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");

      const response: ErrorResponse = {
        error: "Lobby does not exist"
      };

      socket.emit('lobbyError', response);

      return;
    }

    if (lobby.getPlayers().length >= 6) {
      Logger.error("Lobby is full");

      const response: ErrorResponse = {
        error: "Lobby is full"
      };

      socket.emit('lobbyError', response);

      return;
    }

    const player = new Player(socket.id, lobby.getLobbyID(), joinLobby.playerName, false);

    joinLobby.sub && player.setSub(joinLobby.sub);

    await assignProfilePicture(player);

    lobbyManager.addPlayer(joinLobby.lobbyID, player);
    socket.join(lobby.getLobbyID().toUpperCase());

    io.in(lobby.getLobbyID()).emit('lobbyJoined', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  })
}

/**
 * A ready message is sent to the server to indicate that the player is ready to play.
 * Updates the list of players for the room to show who is ready and who is not.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function readyLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("readyLobby", (readyLobbyDTO: ReadyLobbyDTO) => {
    const lobby = lobbyManager.getLobby(readyLobbyDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = lobby.getPlayerBySocketID(socket.id);

    player?.flipIsReady();

    io.in(lobby.getLobbyID()).emit('lobbyJoined', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  })
}

/**
 * A message is sent to the server to indicate that the host wants to start the game.
 * A random code block given the settings of the lobby is generated and sent to every player in the room.
 * The game is then started.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function startGame(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("startGame", (startGameDTO: StartGameDTO) => {
    const lobby = lobbyManager.getLobby(startGameDTO.lobbyID);

    if (lobby?.getStarted()) {
      Logger.error("Lobby already started");

      return;
    }

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    lobby?.setStarted(true);

    const {language, time} = startGameDTO.settings;

    CodeBlock.find({language, time}).then(codeBlocks => {
      const randomisedCodeBlocks = codeBlocks.sort(() => 0.5 - Math.random());

      if (randomisedCodeBlocks.length === 0) {
        Logger.error("No code blocks found");
        return;
      }

      lobby.setCodeBlockId(randomisedCodeBlocks[0]._id);
      lobby.setCodeBlockLength(randomisedCodeBlocks[0].code.length);

      const response: StartGameResponse = {
        ...lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()),
        code: randomisedCodeBlocks[0],
        language: language,
      }

      io.in(lobby.getLobbyID()).emit('gameStart', response);
    });
  })
}

/**
 * This is an update message sent by the players to the server containing their live stats.
 * This is then re-sent to all the players in the room.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function receivePlayerProgress(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("updatePlayerProgress", (playerProgressDTO: PlayerProgressDTO) => {
    const lobby = lobbyManager.getLobby(playerProgressDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = lobby.getPlayerBySocketID(socket.id);

    player?.updateStats({
      CPM: playerProgressDTO.CPM,
      Accuracy: playerProgressDTO.Accuracy,
      Errors: playerProgressDTO.Errors,
      Progress: playerProgressDTO.Progress,
      correctKeyCount: playerProgressDTO.correctKeyCount,
      wrongKeyCount: playerProgressDTO.wrongKeyCount,
      timeLeftInSeconds: playerProgressDTO.timeLeftInSeconds,
    });

    io.in(lobby.getLobbyID()).emit('playerProgressUpdate', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  })
}

/**
 * A message is sent to the server to indicate that the player has finished the game.
 * If all the players are done then the game is ended and a game end message is sent to all the players.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function gameComplete(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("completeGame", async (gameCompleteDTO: CompleteGameDTO) => {
    const lobby = lobbyManager.getLobby(gameCompleteDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = lobby.getPlayerBySocketID(socket.id);

    player?.setFinished(true);

    lobby.orderPlayersByRating();
    await completeGame(lobby, io, lobbyManager);
  })
}

/**
 * A message is sent to the server to indicate that the player has left the game.
 * THe player list is updated and sent to all the players to indicate that the player has left.
 * @param io
 * @param socket
 * @param lobbyManager
 */
function leaveLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  const disconnectSocket = async () => {
    const playerLobby = lobbyManager.getLobbyByPlayerSocketID(socket.id);

    const player = playerLobby?.player;
    const lobby = playerLobby?.lobby;

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    if (player === undefined || player == null) {
      Logger.error("Player does not exist");
      return;
    }

    if (lobby.getPlayers().length === 1) {
      lobbyManager.closeLobby(lobby.getLobbyID());
    } else {
      lobby.removePlayer(player);
    }

    if (lobby.getHost() === player && lobby.getPlayers().length >= 1) {
      lobbyManager.setHost(lobby.getLobbyID(), lobby.getPlayers()[0]);
    }

    socket.leave(lobby.getLobbyID());

    lobby.orderPlayersByRating();
    if (lobby.getStarted() && lobby.getPlayers().length <= 2) {
      await completeGame(lobby, io, lobbyManager);
    }

    io.in(lobby.getLobbyID()).emit('lobbyJoined', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  }

  socket.on("leaveLobby", disconnectSocket);
  socket.on("disconnect", disconnectSocket);
}

/**
 * Helper method used to assign a random profile picture to anonymous users and a current profile picture
 * for registered users.
 * @param player
 */
const assignProfilePicture = async (player: Player) => {
  if (player.getSub() !== "") {
    const profileImage = await getProfilePicture(player.getSub());

    if (profileImage !== undefined) {
      player.setProfilePicture(profileImage);
    }

    return;
  }

  const count = await Avatar.count();
  const rand = Math.floor(Math.random() * count);

  const randomAvatar = await Avatar.findOne().skip(rand);

  if (randomAvatar === undefined || randomAvatar == null) {
    return;
  }

  player.setProfilePicture(randomAvatar.url);
}

/**
 * Helper method to try get the profile picture of a registered user.
 * @param sub
 */
const getProfilePicture = async (sub: string) => {
  const user = await User.findById(sub.split('|')[1]);

  if (user === undefined || user == null) {
    Logger.error("User does not exist");
    return;
  }

  return user.profilePicture;
}

/**
 * Helper method which completes the game by closing the lobby,
 * creating a match history item and updating all the players match history.
 * It then sends the final results to all the players.
 * @param lobby
 * @param io
 * @param lobbyManager
 */
const completeGame = async (lobby: Lobby, io: Server, lobbyManager: LobbyManager) => {
  const players = lobby.getPlayers();

  if (players.every(player => player.isFinished()) && lobby.getStarted()) {

    const users: MatchHistoryUser[] = [];

    for (const player of players) {
      users.push({
        username: player.getPlayerName(),
        profilePicture: player.getProfilePicture(),
        userId: player.getSub() === "" ? "Unregistered" : player.getSub().split('|')[1],
        stats: {
          avgCPM: player.getStats().CPM,
          avgAccuracy: player.getStats().Accuracy,
          avgErrors: player.getStats().Errors,
        }
      });
    }

    const newMatchHistoryItem = new MatchHistory({
      _id : new mongoose.Types.ObjectId(),
      users: users,
      codeBlock: {
        _id: lobby.getCodeBlockId()
      }
    });

    let atLeastOnePlayerFound = false;

    for (let i = 0; i < players.length; i++){
      const player = players[i];
      if (player.getSub() === "") {
        continue;
      }

      const user = await User.findById(player.getSub().split('|')[1]);

      if (user) {
        atLeastOnePlayerFound = true;

        user.avgStats = {
          ...user.avgStats,
          avgCPM: (user.avgStats.avgCPM + player.getStats().CPM) / 2,
          avgAccuracy: (user.avgStats.avgAccuracy + player.getStats().Accuracy) / 2,
          avgErrors: (user.avgStats.avgErrors + player.getStats().Errors) / 2,
          victories: i > 0 ? user.avgStats.victories : user.avgStats.victories + 1
        };

        user.matchHistory.push(newMatchHistoryItem._id);

        await user.save();
      }
    }

    atLeastOnePlayerFound && newMatchHistoryItem.save();

    io.in(lobby.getLobbyID()).emit('gameComplete', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
    lobby?.setStarted(false);

    lobbyManager.closeLobby(lobby.getLobbyID());
  }
}

/**
 * Helper method to convert a list of players to a list of player responses.
 * @param players
 * @param host
 */
const lobbyPlayersToResponse = (players: Player[], host: Player | null): PlayersResponse => {
  return {
    players: players.map(player => {
      return {
        profilePicture: player.getProfilePicture(),
        playerName: player.getPlayerName(),
        socketID: player.getSocketID(),
        isReady: player.getIsReady(),
        isHost: host !== null && host.getSocketID() === player.getSocketID(),
        playerStats: {
          ...player.getStats(),
        }
      }
    })
  };
};

export default function (io: Server, socket: Socket, lobbyManager: LobbyManager) {
  createLobby(io, socket, lobbyManager);
  joinLobby(io, socket, lobbyManager);
  leaveLobby(io, socket, lobbyManager);
  readyLobby(io, socket, lobbyManager);
  receivePlayerProgress(io, socket, lobbyManager);
  startGame(io, socket, lobbyManager);
  gameComplete(io, socket, lobbyManager);
}