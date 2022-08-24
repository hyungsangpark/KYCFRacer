import express from "express";
import AvatatController from "../controllers/AvatarController";
import { checkJwt } from "../middleware/oAuth.js";
import { Schemas, ValidateBody } from "../middleware/InputValidation/Joi";

const router = express.Router();

/**
 * Router file for the AvatarController methods
 */

router.get("/", AvatatController.getRandomAvatar);
router.post("/", AvatatController.createAvatar);
router.get("/all", AvatatController.getAllAvatars);
router.post(
  "/setAvatar",
  checkJwt,
  ValidateBody(Schemas.avatar.setUserAvatar),
  AvatatController.setAvatarForUserToken
);

export = router;
