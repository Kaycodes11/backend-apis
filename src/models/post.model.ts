import { Schema, model, Model, Document } from "mongoose";

// first crate an interface that'll represent the document (what data it should have)
interface IPost {
  title: string;
  desc: string;
  tags: Array<string> | Array<null>;
  image?: string;
  author?: string;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      validate: {
        validator: (v: string): boolean => v.length > 50,
        message: (props) => `${props.value} shound't be greater than fifty `,
      },
    },
    desc: { type: String, required: true, unique: true, max: 250 },
    tags: { type: Array, default: [], validate: [] },
    image: { type: String, default: "default.jpeg" },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", PostSchema);

export { Post };
