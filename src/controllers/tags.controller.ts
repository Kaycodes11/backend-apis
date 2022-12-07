import { Request, Response, NextFunction } from "express";
import Tags from "../models/tags.model";
import Todo, { ITodo } from "../models/todo.model";

export const seedTagOrTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
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
) => {};
export const deleteTagOrTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
