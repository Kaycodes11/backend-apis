import {model, Schema, Document, Types} from "mongoose";

// `Parent` represents the object as it is stored in MongoDB
interface Parent {
    child?: Types.ObjectId,
    name?: string
}



const ParentModel = model<Parent>('Parent', new Schema({
    child: {type: Schema.Types.ObjectId, ref: 'Child'},
    name: String
}));

interface Child {
    name: string;
}

interface PopulatedParent {
    child: Child | null
}


const ChildModel = model<Child>('Child', new Schema({name: String}));

// Populate with `Paths` generic `{ child: Child }` to override `child` path
ParentModel.findOne({}).populate<{ child: Child }>('child').orFail().then(doc => {
    const t: string = doc.child.name;
});

// same thing using Pick<>
ParentModel.findOne({}).populate<Pick<PopulatedParent, 'child'>>('child').orFail().then(doc => {
    const t: string = doc?.child?.name!;
});
