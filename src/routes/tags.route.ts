import express from "express";
import * as TagsController from "../controllers/tags.controller";

const router = express.Router();

router.post("/seed", TagsController.seedTagOrTags);

router.post("/create", TagsController.createTagOrTags);

router.put("/:id", TagsController.updateTagOrTags);

router.delete("/:id", TagsController.deleteTagOrTags);

router.get("/:id", TagsController.getTag);

router.get("/", TagsController.getTags);

export default router;
