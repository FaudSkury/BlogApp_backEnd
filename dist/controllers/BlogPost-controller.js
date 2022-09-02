"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogPosts = exports.addBlogPost = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const User_1 = __importDefault(require("../models/User"));
const addBlogPost = async (req, res, next) => {
    const { title, content, author } = req.body;
    const tags = req.body.tags;
    const splitedTags = tags.split(" ");
    const currentDate = new Date().toLocaleString();
    let foundUser;
    try {
        foundUser = (await User_1.default.findOne({ email: author }));
    }
    catch (error) {
        return next(error);
    }
    const newBlogPost = new BlogPost_1.default({
        author: foundUser,
        title,
        content,
        tags: splitedTags,
        date: currentDate,
    });
    try {
        await newBlogPost.save();
        res.status(201).json({ message: "Post created", post: newBlogPost });
    }
    catch (error) {
        return next(error);
    }
};
exports.addBlogPost = addBlogPost;
const getBlogPosts = async (req, res, next) => {
    let blogPostsFound;
    try {
        blogPostsFound = await BlogPost_1.default.find();
    }
    catch (error) {
        return next(error);
    }
    const filteredPosts = blogPostsFound.slice(-req.params.amount);
    res.send({ message: "Posts Found!", blogPostsFound: filteredPosts });
};
exports.getBlogPosts = getBlogPosts;
