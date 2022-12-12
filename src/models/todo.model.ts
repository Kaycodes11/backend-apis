import { model, Schema } from "mongoose";

export enum TodoStatus {
  DRAFTED = "DRAFTED",
  CREATED = "CREATED",
  PUBLISHED = "PUBLISHED",
  UPDATED = "UPDATED",
  ARCHIVED = "ARCHIVED",
}

export interface ITodo {
  _id?: Schema.Types.ObjectId;
  title: string;
  desc: string;
  tags?: Schema.Types.ObjectId;
  thumbnail?: string;
  status: TodoStatus;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: TodoStatus.CREATED,
      enum: TodoStatus,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
  },
  { timestamps: true }
);

TodoSchema.pre(/^find/, async function (next) {
  // this here refers to query object & when this document/ i.e. this model's instance uses any query that starts with "find"
  // then it will add where to that query to filter out the result
  return this.where({ isDeleted: false });
});

// TodoSchema.query.paginate = async function(limit = 2, pageNo = 1) {
//   return this.skip(limit * (pageNo - 1)).limit(limit)
// };

const Todo = model<ITodo>("Todo", TodoSchema);

export default Todo;
