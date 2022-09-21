import { Schema, model } from "mongoose";

type TComment = {
  text: string;
};

const CommentSchema = new Schema<TComment>(
  {
    text: { type: String, required: true, max: 250 },
  },
  { timestamps: true }
);

const Comment = model<TComment>("Comment", CommentSchema);

export { Comment, TComment };
