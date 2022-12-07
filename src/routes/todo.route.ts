import { Router } from "express";
import * as TodoController from "../controllers/todo.controller";

const router = Router();

router.post("/seed", TodoController.seedTodos);

router.post("/draft", TodoController.draftTodos);

router.post("/create", TodoController.createTodo);

router.put("/:id", TodoController.updateTodo);

router.delete("/:id", TodoController.deleteTodo);

router.get("/:id", TodoController.getTodo);

router.get("/", TodoController.getTodos);

export default router;
