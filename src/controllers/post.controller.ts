import {NextFunction, Request, Response} from "express";
import {Post, PostStatus} from "../models/post.model";

const draftPost = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    try {
        const draftPost = await Post.create({
            title: req.body.title || "some title",
            desc: req.body.desc || "some desc",
            author: user._id,
            status: PostStatus.DRAFTED,
            image: "draftPost.jpg",
        });
        res.status(201).json(draftPost);
    } catch (error: any) {
        next(error.message);
    }
};

const newPost = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    try {
        const newPost = await Post.create({
            title: req.body.title || "some title",
            desc: req.body.desc || "some desc",
            author: user._id,
            status: PostStatus.CREATED,
            image: "newPost.jpg",
        });
        res.status(201).json(newPost);
    } catch (e: any) {
        next(e.message);
    }
};

const updatePost = async (postId: string, payload: any) => {
};

const deletePost = async (postId: string, payload: any) => {
};
const deletePosts = async (req: Request, res: Response) => {
};

// archive post
const hideOrNot = async (postId: string) => {
};

const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments', '-__v').select("-__v").orFail();
        res.status(200).json(post);
    } catch (e: any) {
        res.status(e.status || 500).json({message: e.message});

    }
};
const getPosts = async (req: Request, res: Response) => {
};
const togglePostStatus = async (req: Request, res: Response) => {
};

export {
    draftPost,
    newPost,
    updatePost,
    deletePost,
    hideOrNot,
    deletePosts,
    getPost,
    getPosts,
    togglePostStatus,
};
