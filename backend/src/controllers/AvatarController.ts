import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Avatar from "../models/Avatar";
import { GetUserIdFromExpressUser } from "../util/Util";
import User from "../models/User";

/**
 * This file contains the controller methods for the Avatar model.
 * Which are create, get random, get all and set avatar for user token.
 */

/**
 * Create an avatar model given a url to an image.
 * @param req
 * @param res
 * @param next
 */
const createAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  const newAvatar = new Avatar({
    _id: new mongoose.Types.ObjectId(),
    url,
  });

  return newAvatar
    .save()
    .then(() => res.status(201).json({ newAvatar }))
    .catch((error: Error) => res.status(500).json({ error }));
};

/**
 * Retrieve a random Avatar used to assign it to a user.
 * @param req
 * @param res
 * @param next
 */
const getRandomAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const count = await Avatar.count();
  const rand = Math.floor(Math.random() * count);

  const randomAvatar = await Avatar.findOne().skip(rand);

  return res.status(200).json({ avatar: randomAvatar });
};

/**
 * Get all avatars from the database.
 * @param req
 * @param res
 * @param next
 */
const getAllAvatars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const avatars = await Avatar.find();

  return res.status(200).json({ avatars });
};

/**
 * Given a user token from the authorization header, gets the sub and uses it to identify the user.
 * Then sets the avatar for the user.
 * @param req
 * @param res
 * @param next
 */
const setAvatarForUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sub = GetUserIdFromExpressUser(req.user);

  if (sub.length === 0) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userFromDB = await User.findById(sub);

  if (userFromDB === null) {
    res.status(404).send("User not found");
    return;
  }

  const { avatarId } = req.body;

  const avatar = await Avatar.findById(avatarId);

  if (avatar === null) {
    res.status(404).send("Avatar not found");
    return;
  }

  userFromDB.profilePicture = avatar.url;

  await userFromDB.save();

  return res.status(200).json(userFromDB.profilePicture);
};

export default {
  createAvatar,
  getRandomAvatar,
  getAllAvatars,
  setAvatarForUserToken,
};
