import express from "express";
import errorHandler from "#/middleware/errorHandler";
import mainRoutes from "#/routes/main.routes";
import postsRoutes from "#/routes/posts.routes";
import usersRoutes from "#/routes/users.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

// ------ start app
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
