import {Schema, model, Model, Query, HydratedDocument} from "mongoose";

interface IReply {
    replyText: string;
}

type ReplyModelType = Model<IReply, ReplyQueryHelpers>;

type ReplyModelQuery = Query<any, HydratedDocument<IReply>, ReplyQueryHelpers> & ReplyQueryHelpers;

interface ReplyQueryHelpers {
    byName(this: ReplyModelQuery, name: string): ReplyModelQuery;
}

const ReplySchema = new Schema<IReply, ReplyModelType, {}, ReplyQueryHelpers>({
    replyText: String
}, {timestamps: true});

// Query Helpers
ReplySchema.query.byName = function (name: string): ReplyModelQuery {
    return this.find({name: name});
};

const Reply = model<IReply, ReplyModelType>('Reply', ReplySchema)

export {Reply}

