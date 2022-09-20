import { Schema, model } from "mongoose";

const Tag = model(
  "Tag",
  new Schema(
    {
      name: String,
      slug: String,
      tutorials: [{ type: Schema.Types.ObjectId, ref: "Tutorial" }],
    },
    { timestamps: true }
  )
);

const Tutorial = model(
  "Tutorial",
  new Schema(
    {
      title: String,
      author: String,
      tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    },
    { timestamps: true }
  )
);

const createTutorial = function (tutorial: any) {
  return Tutorial.create(tutorial).then((docTutorial) => {
    console.log("\n>> Created Tutorial:\n", docTutorial);
    return docTutorial;
  });
};

const createTag = function (tag) {
  return Tag.create(tag).then((docTag) => {
    console.log("\n>> Created Tag:\n", docTag);
    return docTag;
  });
};

// const addTagToTutorial = function (tutorialId: string, tag: string) {
//   return Tutorial.findByIdAndUpdate(
//     tutorialId,
//     { $push: { tags: tag._id } },
//     { new: true }
//   );
// };

// const addTutorialToTag = function (tagId, tutorial) {
//   return Tag.findByIdAndUpdate(
//     tagId,
//     { $push: { tutorials: tutorial._id } },
//     { new: true, useFindAndModify: false }
//   );
// };

// const getTutorialWithPopulate = function (id) {
//   // return db.Tutorial.findById(id).populate("tags");
//   return Tutorial.findById(id).populate("tags", "-_id -__v -tutorials");
// };

// const getTagWithPopulate = function (id) {
//   return Tag.findById(id).populate("tutorials", "-_id -__v -tags");
// };

// const run = async function () {
//   var tut1 = await createTutorial({
//     title: "Tut #1",
//     author: "bezkoder",
//   });

//   var tagA = await createTag({
//     name: "tagA",
//     slug: "tag-a",
//   });

//   var tagB = await createTag({
//     name: "tagB",
//     slug: "tag-b",
//   });

//   var tutorial = await addTagToTutorial(tut1._id, tagA);
//   console.log("\n>> tut1:\n", tutorial);

//   var tag = await addTutorialToTag(tagA._id, tut1);
//   console.log("\n>> tagA:\n", tag);

//   tutorial = await addTagToTutorial(tut1._id, tagB);
//   console.log("\n>> tut1:\n", tutorial);

//   tag = await addTutorialToTag(tagB._id, tut1);
//   console.log("\n>> tagB:\n", tag);

//   var tut2 = await createTutorial({
//     title: "Tut #2",
//     author: "zkoder",
//   });

//   tutorial = await addTagToTutorial(tut2._id, tagB);
//   console.log("\n>> tut2:\n", tutorial);

//   tag = await addTutorialToTag(tagB._id, tut2);
//   console.log("\n>> tagB:\n", tag);

//   tutorial = await getTutorialWithPopulate(tut1._id);
//   console.log("\n>> populated tut1:\n", tutorial);

//   tag = await getTagWithPopulate(tag._id);
//   console.log("\n>> populated tagB:\n", tag);
// };

export { Tutorial, Tag };
