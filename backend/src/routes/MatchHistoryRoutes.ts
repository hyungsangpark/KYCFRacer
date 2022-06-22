import express from 'express';
import {Schemas, ValidateBody} from "../middleware/InputValidation/Joi";
import MatchHistoryController from "../controllers/MatchHistoryController";
import {checkJwt} from "../middleware/oAuth.js";

const router = express.Router();

/**
 * Router file for the MatchHistoryController methods
 */

router.post('/solo', ValidateBody(Schemas.matchHistory.create), checkJwt, MatchHistoryController.createMatchHistory);

export = router;