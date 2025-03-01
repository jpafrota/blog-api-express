import errorHandler from "#middleware/errorHandler.js";
import { PostsRouter } from "#routers/posts.router.js";
import { UserRouter } from "#routers/users.router.js";
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// -------
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.get("/simulate-error", (req: Request, res: Response) => {
  throw new Error("something went wrong");
});
// -------

app.use("/users", UserRouter);
app.use("/posts", PostsRouter);

app.use(errorHandler);

// ------ start app
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
