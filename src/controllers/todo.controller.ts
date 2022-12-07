import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Todo, { ITodo } from "../models/todo.model";
import Tags, { ITags } from "../models/tags.model";

// https://www.youtube.com/@WebDevJourney/playlists
// https://www.youtube.com/watch?v=3KYKXsnMpAo&list=PLivfVBKXLkx_1VKrqHv4K6sKIoWTEVlJ9&index=1&ab_channel=Code%26bird
export const seedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// helper function (if needed)
export const addTagToTodo = function (todoId: string, tag: ITags) {
  return Todo.findByIdAndUpdate(
    todoId,
    { $push: { tags: tag._id } },
    { new: true }
  );
};

// helper function (if needed)
export const addTodoToTag = function (tagId: string, todo: ITodo) {
  return Tags.findByIdAndUpdate(
    tagId,
    { $push: { todos: todo._id } },
    { new: true }
  );
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newTodo = new Todo(req.body);

  try {
    const saveTodo = await newTodo.save();
    res.status(201).json(saveTodo);
  } catch (e: any) {
    console.log(new createHttpError["400"]("Bad request"));
    next({ status: e.status || 500, message: e.message });
  }
};
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("tags") ?? {};
      res.send(todo).status(200);
  } catch (e: any) {
    next(e);
  }
};
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
