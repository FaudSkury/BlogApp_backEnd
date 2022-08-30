"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogPost_controller_1 = require("../controllers/BlogPost-controller");
const router = (0, express_1.Router)();
router.post("/", BlogPost_controller_1.addBlogPost);
router.get("/:amount", BlogPost_controller_1.getBlogPosts);
exports.default = router;
