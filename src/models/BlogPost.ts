import mongoose from "mongoose";

export interface IblogPost {
  author: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  date: string;
}

const { Schema } = mongoose;

const blogPostSchema = new Schema<IblogPost>({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: String, required: true },
});

const BlogPost = mongoose.model<IblogPost>("BlogPost", blogPostSchema);

export default BlogPost;
