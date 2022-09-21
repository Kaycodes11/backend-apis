import express from "express";
import {Comment} from "../models/comment.model";
import {Post} from "../models/post.model";

const makeCommentOnPost = async (req: express.Request, res: express.Response) => {
    const postId = req.params.postId;
    //   let postComment = null;
    //   const comment = Comment.create({
    //     text: req.body.comment,
    //   }).then((comm) => {
    //     console.log("new comment", comm);
    //     return Post.findByIdAndUpdate(
    //       postId,
    //       { $push: { comments: comm._id } },
    //       { new: true }
    //     );
    //   });

    //   comment.then((data) => {
    //     console.log(`Post with new comment`, data);
    //     postComment = data;
    //   });

    const comment = await Comment.create({
        text: req.body.comment,
    });

    const postWithNewComment = await Post.findByIdAndUpdate(
        postId,
        {
            $push: {comments: comment._id},
        },
        {new: true}
    );
    console.log(comment);
    console.log(postWithNewComment);

    res.status(201).send({message: "new comment has posted"});
}

const updateCommentOnPost = async (req: express.Request, res: express.Response) => {
    const commentId = req.params.commentId;
    const commentText = req.body.comment;

    const updateComment = await Comment.findByIdAndUpdate(commentId, {
        $set: { text: commentText }
    }, {new: true});

    console.log(updateComment);

    res.status(200).send({message: "comment has been updated"});
}


export {makeCommentOnPost, updateCommentOnPost}
