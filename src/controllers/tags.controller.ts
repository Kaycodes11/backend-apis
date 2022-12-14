import { Request, Response, NextFunction } from "express";
import Tags from "../models/tags.model";
import Todo, { ITodo } from "../models/todo.model";
import { seedTags } from "../seeds/tags";
import moment from "moment";

export const seedTagOrTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const saveTags = await Tags.insertMany(seedTags);
    res.status(201).json(saveTags);
  } catch (e: any) {
    next(e);
  }
};
export const createTagOrTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newTag = new Tags(req.body);

  // first know whether these given id are exist within Todo document or not
  // const todos: ITodo[] = await Promise.all(
  //   req.body.todos.map((item: string) => Todo.findById(item))
  // );

  // console.log(todos);

  try {
    const saveTag = await newTag.save();
    res.status(201).json(saveTag);
  } catch (e: any) {
    next(e);
  }
};
export const updateTagOrTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ## Update Validators Only Runs For Some methods: $set, $unset, $push, $addToSet, $pull, $pullAll
  try {
    // const unset = {$unset : {title: 1, updatedAt: 1}}; // when updating these files are mandatory
    // const push = { $push: [{ title: "React" }, { title: "Angular" }] };
    // const set = { $set: req.body };

    // const addToSet = { $addToSet: { title: ["4", "5"] } }; // the field must be an array, e.g. value ["1", "2"] then now ["1", "2", ["4", "5"] ]

    // const addToSet = { $addToSet: { title: {$each: ["4", "2", "1", "5"]} } }; // ["1", "2"]: after $addToSet => ["1", "2", "4", "5"]

    // const addToSet = { $addToSet: { title: "4", } }; // the field must be an array with value ["1", "2"] then now ["1", "2", "4" ]

    // const addToSet = { $addToSet: { title: "2", } }; // the does nothing as title field has value of 2 already

    // const push = { $push: { title: "Angular" } };

    // const push ={title: "React"}, { $push: { title: { $each: ["React", "Angular"] } } }, {new: true};

    // sort array as descending order and then keep only first two sorted elements
    // const push = { _id: 5 }, { $push: { quizzes: { $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ], $sort: { score: -1 }, $slice: 3 } }}

    const updateTag = await Tags.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updateTag).status(200);
  } catch (e) {
    next(e);
  }
};
export const deleteTagOrTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Tags.findByIdAndDelete(req.params.id);
  } catch (e) {
    next(e);
  }
};
export const getTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await Tags.findById(req.params.id);
    res.status(200).json(tag);
  } catch (e) {
    next(e);
  }
};
export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startDate = moment("2022-12-22T15:02:15.203Z")
    .utcOffset("+0530")
    .format("YYYY-MM-DD");
  const updateDate = moment("2022-12-31T15:02:15.203Z")
    .utcOffset("+0530")
    .format("YYYY-MM-DD");

  console.log(startDate, updateDate);

  // so when filtering date it has to be iso like '2022-12-24T15:20:15.065Z' then use it as it is or transform using moment then filter as below

  try {
    const tags = await Tags.find()
      .where({
        createdAt: { $gte: startDate },
        updatedAt: { $lte: updateDate },
      })
      .select("-__v");
    res.status(200).json(tags);
  } catch (e) {
    next(e);
  }
};
