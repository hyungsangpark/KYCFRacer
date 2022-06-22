import mongoose, {Document, Schema} from 'mongoose';

/**
 * Avatar model containing the url of the img.
 */
export interface IAvatar {
    url: string;
}

export interface IAvatarModel extends IAvatar, Document {
}

const AvatarSchema: Schema = new Schema(
    {
        url: {type: String, required: true},
    }
);

export default mongoose.model<IAvatarModel>('Avatar', AvatarSchema);