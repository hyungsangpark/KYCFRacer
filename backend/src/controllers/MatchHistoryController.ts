import { NextFunction, Request, Response } from 'express';
import {GetUserIdFromExpressUser} from "../util/Util";
import User from "../models/User";
import MatchHistory from "../models/MatchHistory";
import {MatchHistoryUser} from "../DTOs/ApiTypes";
import mongoose from "mongoose";

/**
 * This file contains controller methods for the MatchHistory model.
 * Specifically creating a new match history item and attaching it to a user.
 */

/**
 * Creates a new match history item and attaches it to a user.
 * Identifies the user via the JWT token in the request and extracts a sub from it which is used
 * as the user id.
 * @param req
 * @param res
 * @param next
 */
const createMatchHistory = async (req: Request, res: Response, next: NextFunction) => {
    const sub = GetUserIdFromExpressUser(req.user);

    if (sub.length === 0) {
        res.status(401).send('Unauthorized');
        return;
    }

    const userFromDB = await User.findById(sub);

    if (userFromDB === null) {
        res.status(404).send('User not found');
        return;
    }

    const {avgCPM, avgAccuracy, avgErrors, codeBlockId} = req.body;

    const userAsMatchHistoryUser: MatchHistoryUser = {
        userId: userFromDB.id,
        username: userFromDB.username,
        profilePicture: userFromDB.profilePicture,
        stats: {
            avgCPM,
            avgAccuracy,
            avgErrors
        }
    };

    const newMatchHistoryItem = new MatchHistory({
        _id : new mongoose.Types.ObjectId(),
        users: [userAsMatchHistoryUser],
        codeBlock: {
            _id: codeBlockId
        }
      })

    userFromDB.matchHistory.push(newMatchHistoryItem._id);

    userFromDB.avgStats = {
        ...userFromDB.avgStats,
        avgCPM: (userFromDB.avgStats.avgCPM + avgCPM) / 2,
        avgAccuracy: (userFromDB.avgStats.avgAccuracy + avgAccuracy) / 2,
        avgErrors: (userFromDB.avgStats.avgErrors + avgErrors) / 2,
    };

    await userFromDB.save();

    return newMatchHistoryItem.save()
        .then(() => res.status(201).json({ newMatchHistoryItem }))
        .catch((error: Error) => res.status(500).json({ error }));
};

export default {
    createMatchHistory,
};