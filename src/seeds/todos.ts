import Todo, { ITodo } from "../models/todo.model";
import mongoose from "mongoose";

export const seedMockTodosData: Array<ITodo> = [
  new Todo({
    title: "new todo",
    desc: "This is desc for new todo",
    tags: ["63904e55ead5565cdce76dbd", "63904e55ead5565cdce76dbe"],
  }),

  new Todo({
    title: "todo api",
    desc: "This is desc for todo api",
    tags: ["63904e55ead5565cdce76dbd"],
  }),
];
