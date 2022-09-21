import {Router} from "express";
import * as PostController from "../controllers/post.controller";
import passport from "passport";

const router = Router();

// router.post('/seed');
router.post("/draft", passport.authenticate("jwt"), PostController.draftPost);
router.post("/create", passport.authenticate("jwt"), PostController.newPost);
router.put("/update/:id", passport.authenticate("jwt"), PostController.updatePost);

router.delete("/delete/:id", passport.authenticate("jwt"), PostController.deletePost);

router.delete("/all", passport.authenticate("jwt"), PostController.deletePosts);

router.get("/:id", passport.authenticate("jwt"), PostController.getPost);
router.get("/all", PostController.getPosts);

router.put("/:id/status", passport.authenticate("jwt"), PostController.togglePostStatus);

export default router;
