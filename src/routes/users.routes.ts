import prisma from "#/repositories/connection.js";
import UserNotFoundError from "#errors/UserNotFoundError.js";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

// todo: create an user
router.post("/", async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

// list all users
// todo: add filter/pagination
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({});

  res.send({ data: users });
});

// find user by id
// todo: abstract and create user repository.
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const data = await this.userRepository.findById(id);
    // return res.send({ data });
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!user) throw new UserNotFoundError();

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
});

export default router;
