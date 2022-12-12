import { model, Schema } from "mongoose";

export type TagTitle =
  | "JavaScript"
  | "React"
  | "Next"
  | "Angular"
  | "Node"
  | "Nest";

export interface ITags {
  _id?: Schema.Types.ObjectId;
  title: string | TagTitle;
  // todos: Schema.Types.ObjectId
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
    return /javascript|react|angular|node|nest/i.test(value);
  },
  "title `{VALUE}` not valid at all",
  "Invalid title"
);

// manually define a validation & it'll validate it by itself before saving this document to mongodb
// Note: all validation (built-in & manual) validation runs when this Tag is being created with save ()/create()

// so no need to manually call validate()/validateSync() like new Tags().validate()
// TagsSchema.pre("validate", function (next) {
//   const list: TagTitle[] | string[] = [
//     "JavaScript",
//     "React",
//     "Next",
//     "Angular",
//     "Node",
//     "Nest",
//   ].map((elem) => elem.toLowerCase());
//   if (!list.includes(this.title.toLowerCase()))
//     return next(new Error("invalid tag"));
//   next();
// });

const Tags = model<ITags>("Tags", TagsSchema);

export default Tags;
