import { model, Schema } from "mongoose";

// 1 instance of tag can have many todos
// 1 instance of todo can have many tags

export interface ITags {
  _id: Schema.Types.ObjectId,
  title: string[];
  todos: Schema.Types.ObjectId
}

const TagsSchema = new Schema<ITags>({
  title: {type: [String], required: true, default: []},
  todos: [{type: Schema.Types.ObjectId, ref: "Todo"}]
}, { timestamps: true });


const Tags = model<ITags>("Tags", TagsSchema);

export default Tags;