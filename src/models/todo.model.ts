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

// iso format = '2022-12-14T13:28:49.194Z'; to unix = new Date('2022-12-14T13:28:49.194Z').valueOf()
// similarly, unix to iso format = new Date(1671024529194).toISOString()
TodoSchema.virtual("startDate").get(function (this: HydratedDocument<ITodo>) {
  // moment(new Date('2022-12-14T13:28:49.194Z').valueOf()).utcOffset("dynamic").unix();
  return moment(Math.floor(new Date().valueOf()))
    .utcOffset("+0530")
    .format("YYYY-MM-DD HH:mm A Z");
});
TodoSchema.virtual("updatedDate").get(function (this: HydratedDocument<ITodo>) {
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

// Equivalent to `TodoModel.find({}).skip().limit().sort()` or await TodoModel.find({}).paginate('mongoose');
TodoSchema.query.paginate = function paginate<T extends string | Paginate>(
  this: QueryWithHelpers<any, HydratedDocument<ITodo>, TodoQueryHelpers>,
  page: T extends string ? never : T
) {
  page.pageNo = page.pageNo || 1;
  page.size = page.size || 10;

  console.log(
    "query object i.e. mongoose document: ",
    "QUERY",
    this.getQuery(),
    "FILTER",
    this.getFilter(),
    "PopulatePath",
    this.getPopulatedPaths()
  );

  // even if this.find({}) is an {}; it won't reset / overwrite previous filters from elsewhere so extra options/queries can be added below
  return this.find({})
    .skip(page.size * page.pageNo - page.size)
    .limit(page.size);
};

// since here returning a Promise so no need to use async keyword
TodoSchema.query.byStatus = function byStatus<T = any>(
  this: QueryWithHelpers<any, HydratedDocument<ITodo>, TodoQueryHelpers>,
  status: keyof typeof TodoStatus | ""
) {
  // https://stackoverflow.com/questions/54044420/how-do-i-build-a-dynamic-query-in-mongoose = building query with $and $or
  const query = {} as { status: typeof status | typeof status[] };

  if (typeof status === "string" && status.length) {
    query.status = status;
  } else if (Array.isArray(status) && status.length) {
    // @ts-ignore
    query.status = { $in: status };
  }
  // console.log("query", query);
  return this.find(query);
};

const Todo = model<ITodo, TodoModelType>("Todo", TodoSchema);

export default Todo;
