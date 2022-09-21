import {
    Schema,
    model,
    Model,
    Types,
    Query,
    HydratedDocument,
} from "mongoose";

enum PostStatus {
    DRAFTED = "DRAFTED",
    CREATED = "CREATED",
    PUBLISHED = "PUBLISHED",
    EDITING = "EDITING",
    UPDATED = "UPDATED",
    ARCHIVED = "ARCHIVED",
    REVIEWING = "REVIEWING",
}

// first define the interface that'll represent the document (what data it should have)
interface IPost {
    author: Schema.Types.ObjectId;
    title: string;
    status: PostStatus;
    desc: string;
    comments?: Types.ObjectId;
    tags: Array<string> | Array<null>;
    image?: string;
}

type PostModelType = Model<IPost, PostQueryHelpers>;

type PostModelQuery = Query<any, HydratedDocument<IPost>, PostQueryHelpers> &
    PostQueryHelpers;

type PostQueryHelpers = {
    byName(this: PostModelQuery, name: string): PostModelQuery;
};

// N [Post] : M [Comment]
const PostSchema = new Schema<IPost, PostModelType, {}, PostQueryHelpers>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            // max: 50,
            // validate: {
            //     validator: (v: string): boolean => v.length > 50,
            //     message: (props) => `${props.value} should not be greater than fifty `,
            // },
        },
        desc: {type: String, required: true, unique: true, max: 250},
        comments: [{type: Types.ObjectId, ref: "Comment"}],
        tags: {type: Array, default: [], validate: []},
        image: {type: String, default: "default.jpeg"},
        author: {type: Schema.Types.ObjectId, ref: "User"},
        status: {
            type: String,
            required: true,
            default: PostStatus.CREATED,
            enum: PostStatus,
        },
    },
    {timestamps: true}
);

// Query Helpers
PostSchema.query.byName = function (title: string): PostModelQuery {
    return this.find({title});
};

const Post = model<IPost, PostModelType>("Post", PostSchema);

export {Post, PostStatus};
