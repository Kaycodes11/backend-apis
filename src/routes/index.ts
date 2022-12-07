import { Router } from "express";
import TodoRoute from "./todo.route";
import TagsRoute from "./tags.route";

const router = Router();

router.use("/api/todo", TodoRoute);
router.use("/api/tags", TagsRoute);

export default router;
