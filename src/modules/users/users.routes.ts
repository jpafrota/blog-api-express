import { NextFunction, Request, Response, Router } from "express";
import validateBody from "#/middleware/validateBody";
import prisma from "#/database/connection";
import { CreateUserDTO, CreateUserSchema } from "#/modules/users/users.dto";
import UserAlreadyExistsException from "#/errors/UserAlreadyExists";

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

      const user = await prisma.user.create({
        data,
      });
      res.send({ data: { user } });
    } catch (err) {
      next(err);
    }
  },
);

// find all users
router.get("/", (req, res) => {});

// find user by id
router.get("/:id", (req, res, next) => {});

// update user's pwd
router.patch("/update-password", (req, res, next) => {});

export default router;
