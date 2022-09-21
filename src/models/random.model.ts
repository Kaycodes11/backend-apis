import {HydratedDocument, model, Model, Query, Schema} from "mongoose";


interface IRandom {
    level: string;
}

type RandomModelType = Model<IRandom, RandomQueryHelpers>;

type RandomModelQuery = Query<any, HydratedDocument<IRandom>, RandomQueryHelpers> & RandomQueryHelpers;

type RandomQueryHelpers = {
    byName(this: RandomModelQuery, name: string): RandomQueryHelpers;
}


interface RandomMethods {
    rand(): string
}

const RandomSchema = new Schema<IRandom, RandomModelType, RandomMethods, RandomQueryHelpers>({level: String});

RandomSchema.query.byName = function (level: string): RandomModelQuery {
    return this.find({level});
};

RandomSchema.methods.rand =  function (): string {
    return "random number"
};

const RandomModel = model<IRandom, RandomModelType>('T', RandomSchema);

