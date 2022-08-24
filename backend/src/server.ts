import express from "express";
import http from "http";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";

import Logger from "./util/Logger";
import { config } from "./config/config";
import userRoutes from "./routes/UserRoutes";
import matchHistoryRoutes from "./routes/MatchHistoryRoutes";
import codeBlockRoutes from "./routes/CodeBlockRoutes";
import AvatarRoutes from "./routes/AvatarRoutes";

import loadLobbyEvents from "./socketEvents/LobbyEvents";
import LobbyManager from "./socketEvents/SocketModels/LobbyManager";

const swaggerFile = require("../swagger_output.json");

const router = express();
const httpServer = http.createServer(router);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logger.info("Mongo DB connected successfully.");
    StartServer();
  })
  .catch((error) => Logger.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    Logger.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      Logger.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use("/user", userRoutes);
  router.use("/match-history", matchHistoryRoutes);
  router.use("/codeblocks", codeBlockRoutes);
  router.use("/avatar", AvatarRoutes);
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  const lobbyManager = new LobbyManager();

  /** Socket.io */
  io.on("connection", (socket) => {
    Logger.info(
      `Socket.io - Client connected - IP: [${socket.handshake.address}]`
    );
    loadLobbyEvents(io, socket, lobbyManager);
  });

  /** Health-check */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("Not found");

    Logger.error(error);

    res.status(404).json({
      message: error.message,
    });
  });

  httpServer.listen(config.server.port, () =>
    Logger.info(`Server is running on port ${config.server.port}`)
  );
};
