import express from "express";
import bodyParser from "body-parser";

import errorHandler from "#/middleware/error-handler";
import mainRoutes from "#/routes/main.routes";
import postsRoutes from "#/modules/posts/posts.routes";
import usersRoutes from "#/modules/users/users.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
