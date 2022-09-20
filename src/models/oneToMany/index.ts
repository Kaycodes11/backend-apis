import { Schema, model } from "mongoose";

const Category = model(
  "Category",
  new Schema({ name: String, desc: String }, { timestamps: true })
);

const Comment = model(
  "Comment",
  new Schema(
    { username: String, text: String, created_at: Date, updated_at: Date },
    { timestamps: true }
  )
);

const Image = model(
  "Image",
  new Schema(
    {
      path: String,
      url: String,
      caption: String,
      created_at: Date,
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
      images: Array,
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      categories: {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    },
    { timestamps: true }
  )
);

const createCategory = async (tutorialId: string, category: unknown) => {
  return Category.create(category).then((data: any) => {
    return data;
  });
};

const createTutorial = async (tutorial: any) => {
  return Tutorial.create(tutorial).then((data: any): void => {
    console.log(data);
    // return data
  });
};

const createImage = async (tutorialId: string, image: string) => {
  return Image.create(image).then((data: any) => {
    return Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            _id: data._id,
            url: data.url,
            caption: data.caption,
          },
        },
      },
      { new: true }
    );
  });
};

const createComment = async (tutorialId: string, comment: unknown) => {
  return Comment.create(comment).then((data: any) => {
    return Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: { comments: data._id },
      },
      { new: true }
    );
  });
};

const addTutorialToCategory = async (
  tutotialId: string,
  categoryId: string
) => {
  return Tutorial.findByIdAndUpdate(
    tutotialId,
    { category: categoryId },
    { new: true }
  );
};

const getAllData = (id: string) => {
  return Tutorial.findById(id).populate("comments").populate("category");
};

const getTutorialFromCategory = (categoryId: string) => {
  return Tutorial.find({ category: categoryId })
    .populate("category", "name_id")
    .select("-comments -images -__v");
};

const run = async () => {
  const tutorial = await createTutorial({ title: "good blog", author: "john" });

  // const image = await createImage(tutorial._id, {
  //   path: "test",
  //   url: "test",
  //   caption: "test",
  // });

  // const comment =  await createComment(tutorial._id, {username: "john", text: "this is good tutorial", created_at: Date.now()})

  // const category = await createCategory({name: 'nodejs', desc: "nodejs tutorial"})

  // await addTutorialToCategory(tutorial._id, category._id)
};

export { Image, Tutorial, Category, Comment };
