import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import blogPostrouter from "./routes/BlogPost-routes";
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(express.json());

app.use("/blogPost", blogPostrouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send(err.message);
  console.error(err);
};
app.use(errorHandler);

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://FaudSkury:695001019@cluster0.v1tgq.mongodb.net/blogApp?retryWrites=true&w=majority"
    );
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

const Port = 4000;
app.listen(Port, () => {
  console.log(`Listening at port ${Port}`);
  connectToMongoDB();
});
