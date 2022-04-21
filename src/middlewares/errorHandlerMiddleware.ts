import { NextFunction, Request, Response } from "express";

interface AppError {
  type?: string;
}

export default function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ("type" in error) {
    switch (error.type) {
      case "conflict":
        return res.sendStatus(409);
    }
  }

  console.error(error);
  res.sendStatus(500);
}
