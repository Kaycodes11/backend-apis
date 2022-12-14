import Todo, { ITodo } from "../models/todo.model";
import mongoose from "mongoose";
import Tags from "../models/tags.model";

// const defaultTag =  () => Promise.resolve(Tags.create({title: "untitled"}));
// defaultTag().then((data) => {
//   console.log("data", data);
// });

export const seedMockTodosData: Array<ITodo> = [
  new Todo({
    title: "new todo",
    desc: "This is desc for new todo",
    tags: ["639742773e382ed294826b78", "639742773e382ed294826b79"],
  }),

  new Todo({
    title: "todo api",
    desc: "This is desc for todo api",
    tags: ["639742773e382ed294826b7a", "639742773e382ed294826b7b"],
  }),

  new Todo({
    title: "lets make some todo",
    desc: "This is desc for todo api",
    tags: ["639746aea2e8e0ccd7b4a1db"]
  }),

  new Todo({
    title: "todo works",
    desc: "This is desc for todo api",
    tags: ["639746aea2e8e0ccd7b4a1db"]
  }),
];
