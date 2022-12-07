import { model, Schema } from "mongoose";


export enum TodoStatus {
  DRAFTED = "DRAFTED",
  CREATED = "CREATED",
  PUBLISHED = "PUBLISHED",
  UPDATED = "UPDATED",
  ARCHIVED = "ARCHIVED",

}

type Tags = { tagId: string, tagName: string | string[]};
type TagsKeys = keyof Tags;


// here, make an interface representing this document in mongodb

export interface ITodo {
  _id?: Schema.Types.ObjectId,
  title: string;
  desc: string;
  // tags: Map<TagsKeys, Tags>;
  tags: Schema.Types.ObjectId;
  thumbnail?: string
  // status: { [key: string]: string };
  status: TodoStatus
}

// interface ITodoWithSocial extends ITodo, Document {}

// make schema based on the document shape

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  // tags: {
  //   type: Map,
  //   of: {
  //     tagId: { type: String, required: true },
  //     tagTitle:{ type: String, required: true },
  //   },
  //   https://stackoverflow.com/questions/56398873/type-checking-in-mongoose-maps
  //   default: null
  // },
  status: {type: String, required: true, default: TodoStatus.CREATED, enum: TodoStatus},
  tags: [{type: Schema.Types.ObjectId, ref: "Tags"}],
}, {timestamps: true});

const Todo = model<ITodo>("Todo", TodoSchema);

// this is how to set a new to do and tags's value is a Map
// new Todo({title: "Todo 1", desc: "todo desc", tags: { 'tagId': "todo1", 'tagTitle': "todo tag" } });

export default Todo;