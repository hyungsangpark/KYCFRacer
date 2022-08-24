import mongoose, { Document, Schema } from "mongoose";

/**
 * CodeBlock model containing the code block text, time limit and the programming language.
 */
export interface ICodeBlock {
  language: string;
  time: string;
  code: string;
}

export interface ICodeBlockModel extends ICodeBlock, Document {}

const CodeBlockSchema: Schema = new Schema(
  {
    language: { type: String, required: true },
    time: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICodeBlockModel>("CodeBlock", CodeBlockSchema);
