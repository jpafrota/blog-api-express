import UserNotFoundException from "#exceptions/UserNotFoundException.js";
import prisma from "#repositories/connection.js";
import express, { NextFunction, Request, Response } from "express";

const UserRouter = express.Router();

// todo: create an user
UserRouter.post("/", async (req, res) => {
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

// list all users
UserRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany({});

  res.send({ data: users });
});

// find user by id
// TODO: abstract and create user repository.
UserRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const data = await this.userRepository.findById(id);
      // return res.send({ data });
      const user = await prisma.user.findFirst({
        where: {
          id: req.params.id,
        },
      });

      if (!user) throw new UserNotFoundException("User not found");

      res.send({ data: user });
    } catch (error) {
      next(error);
    }
  },
);

export { UserRouter };
