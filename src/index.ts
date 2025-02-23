import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

// routes
app.get("/", (req, res) => {
  throw new Error();
  res.send("Hello, TypeScript + Express!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: "Jorge",
      },
    },
  });

  console.log(users);

  res.send({ data: users });
});

app.post("/users", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        cpf: "192381928312",
        email: "jorgefrota@gmail.com",
        name: "Jorge Frota",
        phone: "12312893",
      },
    });
    res.send({ message: "ok" });
  } catch (err) {
    if (err instanceof Error) {
      res.send({ message: err.message });
    } else {
      res.send({ message: "An unknown error occurred" });
    }
  }
});

app.post("/posts");

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  console.log(err.stack);
  res.status(500).send({ status: 500, message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
