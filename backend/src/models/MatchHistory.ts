import mongoose, {Document, Schema} from 'mongoose';

/**
 * MatchHistory item model containing the list of users and their stats in the game
 * as well as the code block for the game.
 */
export interface IMatchHistory{
}

export interface IMatchHistoryModel extends IMatchHistory, Document {
}

const MatchHistorySchema: Schema = new Schema(
    {
        users: [
          {
            userId: String,
            username: String,
            profilePicture: String,
            stats: {
              avgCPM: Number,
              avgAccuracy: Number,
              avgErrors: Number,
            }
          }
        ],
      codeBlock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CodeBlock"
      }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMatchHistoryModel>('MatchHistory', MatchHistorySchema);