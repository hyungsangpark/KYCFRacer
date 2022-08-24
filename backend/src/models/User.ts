import mongoose, { Document, Schema } from "mongoose";
import { MatchHistoryItem, ProfileStats } from "../DTOs/ApiTypes";

/**
 * User model containing the user's username, profile picture,
 * average stats over their lifetime games and a list of their match histories.
 */
export interface IUser {
  username: string;
  profilePicture: string;
  avgStats: ProfileStats;
  matchHistory: MatchHistoryItem[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    profilePicture: { type: String },
    avgStats: {
      avgCPM: Number,
      avgAccuracy: Number,
      avgErrors: Number,
      victories: Number,
    },
    matchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatchHistory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
