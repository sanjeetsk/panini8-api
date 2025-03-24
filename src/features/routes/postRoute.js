import express from 'express';
import PostController from '../controllers/post.controller.js';
import jwtAuth from '../../middlewares/auth.middleware.js';

const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/", jwtAuth, postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", jwtAuth, postController.updatePost);
postRouter.delete("/:id", jwtAuth, postController.deletePost);

export default postRouter;