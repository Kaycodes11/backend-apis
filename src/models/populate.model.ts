import { Schema, model } from "mongoose";

// `Parent` represents the object as it is stored in MongoDB
interface Parent {
  child?: Schema.Types.ObjectId;
  name?: string;
}

interface PopulatedParent {
  child?: Child | null;
}

const ParentModel = model<Parent>("Parent", new Schema({ child: { type: Schema.Types.ObjectId, ref: "Child" }, name: String, }));

interface Child {
  name: string;
}

const childSchema: Schema = new Schema({ name: String });

const ChildModel = model<Child>("Child", childSchema);

// Populate with `Paths` generic `{ child: Child }` to override `child` path
ParentModel.findOne({}).populate<{ child: Child }>("child").orFail().then((doc) => {
    // Works
    const t: string = doc.child.name;
  });


// ParentModel.findOne({}).populate<Pick<PopulatedParent, 'child'>>('child').orFail();
