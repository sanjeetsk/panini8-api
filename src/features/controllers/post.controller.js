import Post from "../models/post.model.js";

export default class PostController {
    async createPost(req, res) {
        try {
            const { title, content, tags } = req.body;
            const newPost = new Post({ title, content, tags, author: req.user.userId });
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "name");
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }

    async updatePost(req, res) {
        try {
            const { title, content, tags } = req.body;
            const post = await Post.findById(req.params.id);
            if (!post || post.author.toString() !== req.user.userId) {
                return res.status(403).json({ message: "Not authorized" });
            }
            post.title = title;
            post.content = content;
            post.tags = tags;
            await post.save();
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post || post.author.toString() !== req.user.userId) {
                return res.status(403).json({ message: "Not authorized" });
            }
            await post.remove();
            res.json({ message: "Post deleted" });
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }
}