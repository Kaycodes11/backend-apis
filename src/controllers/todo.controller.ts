import { Request, Response, NextFunction } from "express";
import Todo, { ITodo, TodoStatus } from "../models/todo.model";
import Tags, { ITags } from "../models/tags.model";
import { seedMockTodosData } from "../seeds/todos";

// https://www.youtube.com/@WebDevJourney/playlists
// https://www.youtube.com/watch?v=3KYKXsnMpAo&list=PLivfVBKXLkx_1VKrqHv4K6sKIoWTEVlJ9&index=1&ab_channel=Code%26bird

export const seedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.insertMany(seedMockTodosData);
    res.json(todos).status(201);
  } catch (e: any) {
    next(e);
  }
};

export const draftTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newTodo = new Todo(req.body);
  newTodo.status = TodoStatus.DRAFTED;

  try {
    const draftTodo = await newTodo.save();
    res.status(201).json(draftTodo);
  } catch (e: any) {
    next({ status: e.status || 500, message: e.message });
  }
};

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
    next({ status: e.status || 500, message: e.message });
  }
};
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id).orFail();
    if (!todo) return next({ status: 400, message: "No such todo found" });

    // whatever value user given take it and update it by req.params.id
    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ ...updateTodo });
  } catch (e: any) {
    next(e);
  }
};
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id).orFail();
    if (!todo) return next({ status: 400, message: "No such todo found" });

    // whatever value user given take it and delete it by req.params.id
    const updateTodo = await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({ ...updateTodo });
  } catch (e: any) {
    next(e);
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("tags");
    res.send(todo).status(200);
  } catch (e: any) {
    next(e);
  }
};
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // pagination, filter by date, time, status, tag
  try {
    const todos = await Todo.find().populate("tags");
    res.status(200).json(todos);
  } catch (e) {
    next(e);
  }
};
