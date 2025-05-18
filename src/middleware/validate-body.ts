import RequestBodyRequiredException from "#/errors/request-body-required.exception";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

function validateBody<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        throw new RequestBodyRequiredException();
      }
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default validateBody;
