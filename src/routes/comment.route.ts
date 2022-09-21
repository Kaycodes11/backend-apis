import express from "express";
import * as CommentController from '../controllers/comment.controller'

const router = express.Router();

router.post("/:postId", CommentController.makeCommentOnPost);
router.put("/:commentId", CommentController.updateCommentOnPost);

export default router;
