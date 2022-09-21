import {Schema, model} from "mongoose";

type TComment = {
    text: string;
    reply: Schema.Types.ObjectId
};

// N : M
const CommentSchema = new Schema<TComment>(
    {
        text: {type: String, required: true, max: 250},
        reply: [{type: Schema.Types.ObjectId, ref: "Reply"}]
    },
    {timestamps: true}
);

const Comment = model<TComment>("Comment", CommentSchema);

export {Comment, TComment};
