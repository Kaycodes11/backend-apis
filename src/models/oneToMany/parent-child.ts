import {model, Schema} from "mongoose";

interface Parent {
    child?: Schema.Types.ObjectId,
    name?: string
}
// to allow to multiple children then child: [{type: Schema.Types.ObjectId, ref: 'Child'}]
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

// ParentModel.findOne({}).populate<{ child: Child }>('child').orFail().then(doc => {
//     const t: string = doc.child.name;
// });

// same thing using Pick<>
// ParentModel.findOne({}).populate<Pick<PopulatedParent, 'child'>>('child').orFail().then(doc => {
//     const t: string = doc?.child?.name!;
// });

export {ParentModel, ChildModel, Child, Parent};
