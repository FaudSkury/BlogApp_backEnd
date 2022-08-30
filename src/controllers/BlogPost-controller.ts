import { RequestHandler } from "express";
import BlogPost, { IblogPost } from "../models/BlogPost";

export const addBlogPost: RequestHandler = async (req, res, next) => {
  const { title, content, author } = req.body as IblogPost;
  const tags = req.body.tags as string;
  const splitedTags = tags.split(" ");
  const currentDate = new Date().toLocaleString();

  const newBlogPost = new BlogPost({
    author,
    title,
    content,
    tags: splitedTags,
    date: currentDate,
  });

  try {
    await newBlogPost.save();
    res.status(201).json({ message: "Post created", post: newBlogPost });
  } catch (error) {
    return next(error);
  }
};

export const getBlogPosts: RequestHandler = async (req, res, next) => {
  let blogPostsFound: IblogPost[];

  try {
    blogPostsFound = await BlogPost.find();
  } catch (error) {
    return next(error);
  }
  const filteredPosts = blogPostsFound.slice(-req.params.amount);

  res.send({ message: "Posts Found!", blogPostsFound: filteredPosts });
};
