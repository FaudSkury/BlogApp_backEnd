import { Router } from "express";
import { addBlogPost, getBlogPosts } from "../controllers/BlogPost-controller";

const router = Router();

router.post("/", addBlogPost);

router.get("/:amount", getBlogPosts);

export default router;
