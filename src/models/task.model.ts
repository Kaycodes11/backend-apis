import {
  HydratedDocument,
  Model,
  Query,
  Schema,
  model,
  QueryWithHelpers,
} from "mongoose";

interface Task {
  name?: string;
  stars?: number;
}

interface TaskQueryHelpers {
  byName(
    name: string
  ): QueryWithHelpers<
    HydratedDocument<Task>[],
    HydratedDocument<Task>,
    TaskQueryHelpers
  >;
}

// methods
interface ITaskMethods {
  generateId(): string;
}

// statics

interface TaskModelType extends Model<Task, TaskQueryHelpers, ITaskMethods> {
  randomId(toStringNo: string): Promise<string>;
}

const TaskSchema = new Schema<
  Task,
  Model<Task, TaskQueryHelpers>,
  {},
  TaskQueryHelpers,
  ITaskMethods
>({
  name: String,
  stars: Number,
});

// method defined, and it'll be available as new TaskModel().generateId();
TaskSchema.method("generateId", function (): string {
  return `${this.name}${Math.random().toString(32).substring(2, 9)}`;
});

// static defined, and it'll be available as TaskSchema.randomId()
TaskSchema.static("randomId", function (toStringNo = 32): string {
  return Math.random().toString(toStringNo).substring(2, 9);
});

TaskSchema.query.byName = function byName(
  this: QueryWithHelpers<any, HydratedDocument<Task>, TaskQueryHelpers>,
  name: string
) {
  return this.find({ name: name });
};

// 2nd param to `model()` is the Model class to return.
const TaskModel = model<Task, TaskModelType>("Task", TaskSchema);



// Equivalent to `TaskModel.find({ stars: { $gt: 1000 }, name: 'mongoose' })`
// await TaskModel.find().where('stars').gt(1000).byName('mongoose');
