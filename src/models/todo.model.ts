import {
  HydratedDocument,
  Model,
  model,
  QueryWithHelpers,
  Schema,
} from "mongoose";
import moment from "moment";

export enum TodoStatus {
  DRAFTED = "DRAFTED",
  CREATED = "CREATED",
  PUBLISHED = "PUBLISHED",
  UPDATED = "UPDATED",
  ARCHIVED = "ARCHIVED",
  NONE = "NONE",
}

// https://stackoverflow.com/questions/41308123/map-typescript-enum

export interface ITodo {
  _id?: Schema.Types.ObjectId;
  title: string;
  desc: string;
  tags?: Schema.Types.ObjectId;
  thumbnail?: string;
  status: TodoStatus;
}

interface TodoQueryHelpers {
  paginate(
    name: string
  ): QueryWithHelpers<
    HydratedDocument<ITodo>[],
    HydratedDocument<ITodo>,
    TodoQueryHelpers
  >;
  byStatus(
    value: string
  ): QueryWithHelpers<
    HydratedDocument<ITodo>[],
    HydratedDocument<ITodo>,
    TodoQueryHelpers
  >;
}

type TodoModelType = Model<ITodo, {}, TodoQueryHelpers>;

// noinspection SpellCheckingInspection
const TodoSchema = new Schema<
  ITodo,
  Model<ITodo, TodoQueryHelpers>,
  {},
  TodoQueryHelpers
>(
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
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { virtuals: true, getters: true },
  }
);

// TodoSchema.pre(/^find/, async function (next) {
// this here refers to query object & when this document/ i.e. this model's instance uses any query that starts with "find"
// then it will add where to that query to filter out the result
// return this.where({ isDeleted: false });
// });

TodoSchema.virtual("startDate").get(function (this: HydratedDocument<ITodo>) {
  return moment(Math.floor(new Date().valueOf()))
    .utcOffset("+0530")
    .format("YYYY-MM-DD HH:mm A Z");
});

type Paginate = {
  pageNo: number;
  size: number;
  sortBy?: -1 | 1;
  limit?: number;
};

// Equivalent to `TodoModel.find({}).skip().limit().sort()`
// await TodoModel.find({}).paginate('mongoose');
TodoSchema.query.paginate = function paginate<T extends string | Paginate>(
  this: QueryWithHelpers<any, HydratedDocument<ITodo>, TodoQueryHelpers>,
  page: T extends string ? never : T
) {
  // skip = 10 * 1 - 10 or 10 * ( 1 - 1)
  return this.find({})
    .skip(page.size * page.pageNo - page.size)
    .limit(page.size)
    .sort({ createdAt: -1 });
};

// since here returning a Promise so no need to use async keyword
TodoSchema.query.byStatus = function byStatus<T = any>(
  this: QueryWithHelpers<any, HydratedDocument<ITodo>, TodoQueryHelpers>,
  status: TodoStatus | keyof typeof TodoStatus
) {
  return this.find({ status: TodoStatus[status] });
};

const Todo = model<ITodo, TodoModelType>("Todo", TodoSchema);

export default Todo;
