import { model, Schema } from "mongoose";

// 1 instance of tag can have many todos (not necessary as the specific post/posts can be found by using tagId or tagIds from Todo document)
// 1 instance of todo can have many tags

export type TagTitle = "JavaScript" | "React" | "Next" | "Angular" | "Node" | "Nest";

export interface ITags {
  _id?: Schema.Types.ObjectId,
  title: string | TagTitle;
  // todos: Schema.Types.ObjectId
}

const TagsSchema = new Schema<ITags>({
  title: {type: String, required: true},
  // todos: [{type: Schema.Types.ObjectId, ref: "Todo"}]
}, { timestamps: true });


const Tags = model<ITags>("Tags", TagsSchema);

export default Tags;