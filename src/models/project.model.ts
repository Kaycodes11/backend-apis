import {
  HydratedDocument,
  Model,
  Query,
  Schema,
  model,
  QueryWithHelpers,
} from "mongoose";

interface Project {
  name?: string;
  stars?: number;
}

interface ProjectQueryHelpers {
  byName(
    name: string
  ): QueryWithHelpers<
    HydratedDocument<Project>[],
    HydratedDocument<Project>,
    ProjectQueryHelpers
  >;
}

type ProjectModelType = Model<Project, ProjectQueryHelpers>;

const ProjectSchema = new Schema<
  Project,
  Model<Project, ProjectQueryHelpers>,
  {},
  ProjectQueryHelpers
>({
  name: String,
  stars: Number,
});

ProjectSchema.query.byName = function byName(
  this: QueryWithHelpers<any, HydratedDocument<Project>, ProjectQueryHelpers>,
  name: string
) {
  return this.find({ name: name });
};

// 2nd param to `model()` is the Model class to return.
const ProjectModel = model<Project, ProjectModelType>("Project", ProjectSchema);

// Equivalent to `ProjectModel.find({ stars: { $gt: 1000 }, name: 'mongoose' })`
// await ProjectModel.find().where('stars').gt(1000).byName('mongoose');

export { ProjectModel };
