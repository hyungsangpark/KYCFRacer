import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { UserProfile } from "../DTOs/ApiTypes";
import { GetUserIdFromExpressUser } from "../util/Util";

/**
 * This file contains controller methods for the User model.
 */

/**
 * Retrieves a user profile given their sub claim in the JWT token which is used to
 * identify them.
 * @param req
 * @param res
 * @param next
 */
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const sub = GetUserIdFromExpressUser(req.user);

  if (sub.length === 0) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userFromDB = await User.findById(sub).populate("matchHistory");

  if (userFromDB === null) {
    res.status(404).send("User not found");
    return;
  }

  const response: UserProfile = {
    username: userFromDB.username,
    profilePicture: userFromDB.profilePicture,
    avgStats: userFromDB.avgStats,
    matchHistory: userFromDB.matchHistory,
  };

  res.status(200).send(response);
};

export default {
  getUser,
};
