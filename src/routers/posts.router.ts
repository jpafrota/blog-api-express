import express from "express";

const PostsRouter = express.Router();

PostsRouter.get("/", (req, res) => {
  res.send("hey");
});

export { PostsRouter };
