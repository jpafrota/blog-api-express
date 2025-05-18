import { NextFunction, Request, Response, Router } from "express";
import validateBody from "#/middleware/validate-body";
import prisma from "#/database/connection";
import {
  CreateUserDTO,
  CreateUserSchema,
} from "#/modules/users/dtos/create-user.dto";
import UserAlreadyExistsException from "#/errors/user-already-exists.exception";
import bcrypt from "bcrypt";
import { UpdateUserDTO, UpdateUserSchema } from "./dtos/update-user.dto";

const router = Router();

// create a user
router.post(
  "/",
  validateBody(CreateUserSchema),
  async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const data = req.body;

    try {
      const userExists = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (userExists) throw new UserAlreadyExistsException();

      const encryptedPassword = bcrypt.hashSync(data.password, 10);

      const user = await prisma.user.create({
        data: {
          ...data,
          password: encryptedPassword,
        },
      });

      res.send({ data: { userId: user.id } });
    } catch (err) {
      next(err);
    }
  },
);

// find all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  res.send({ data: users });
});

router.patch(
  "/:id",
  validateBody(UpdateUserSchema),
  async (
    req: Request<{ id: string }, unknown, UpdateUserDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const data = req.body;
    const id = req.params.id;

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      omit: {
        password: true,
      },
    });

    res.send({ message: "User updated successfully", data: updatedUser });
  },
);

// find user by id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.send({ data: user });
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.send({
      message: "User deleted successfully.",
      data: {
        userId: id,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
