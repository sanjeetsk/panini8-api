import express from 'express';
import PostController from '../controllers/post.controller.js';

const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;