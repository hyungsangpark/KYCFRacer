import express from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middleware/oAuth.js";

const router = express.Router();

/**
 * Router file for the UserController methods
 */

router.get("/", checkJwt, UserController.getUser);

export = router;
