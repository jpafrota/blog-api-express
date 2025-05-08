import errorHandler from "#/middleware/errorHandler.js";
import postsRoutes from "#/routes/posts.routes.js";
import usersRoutes from "#/routes/users.routes.js";
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// ------- Error handling
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.get("/simulate-error", (req: Request, res: Response) => {
  throw new Error("something went wrong");
});
// -------

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

// ------ start app
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
