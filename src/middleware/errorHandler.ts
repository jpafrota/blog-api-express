import { CustomException } from "#/errors/CustomException";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof CustomException) {
    res.status(error.httpStatusCode).send({
      error: {
        status: error.httpStatusCode,
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof ZodError) {
    const issues = error.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    res.status(400).json({
      error: "Validation failed",
      details: issues,
    });
    return;
  }

  console.log(error.stack);
  res.status(500).send({
    error: { status: 500, message: getErrorMessage(error) },
  });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An error occurred. Please check logs for more details.";
}
