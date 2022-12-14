import { model, Schema } from "mongoose";

export type TagTitle =
  | string
  | "JavaScript"
  | "React"
  | "Next"
  | "Angular"
  | "Node"
  | "Nest";

export interface ITags {
  _id?: Schema.Types.ObjectId;
  title: TagTitle;
}

const TagsSchema = new Schema<ITags>(
  {
    title: { type: String, required: true, default: "Untitled" },
  },
  { timestamps: true }
);

// rather than writing a `manual validation` within model like TagsSchema = {title: String, validate: {}); it could be written like below;
// so here added a `manual validation on "title" property` which will run by default when used saved()/create() method on this model

/* to validate when doing update by using update, updateOne, findByIdAndUpdate or updateMany, just use {runValidators: true}
 * refer to "tag.controller.ts : updateTagOrTags", with that it'll run all build-in & manual validators for all properties from model * */
TagsSchema.path("title").validate(
  function (value: string) {
    return /javascript|react|angular|node|nest|next|untitled/i.test(value);
  },
  "title `{VALUE}` not valid at all",
  "Invalid title"
);

const Tags = model<ITags>("Tags", TagsSchema);

export default Tags;
