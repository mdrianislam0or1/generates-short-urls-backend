import { Application, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.status || 500;
  let errorMessage: string;
  let errorDetails: any;
  let stack: string | undefined;

  if (err instanceof mongoose.Error.CastError) {
    errorMessage = "Invalid ID";
    errorDetails = {
      stringValue: err.stringValue,
      valueType: (err as any).valueType,
      kind: err.kind,
      value: err.value,
      path: err.path,
      reason: err.reason,
      name: err.name,
      message: err.message,
    };
    stack = err.stack;
  } else if (err instanceof ZodError) {
    statusCode = 422;
    errorMessage = "Validation Error";
    const issues = err.issues.map((issue) => ({
      expected: issue.message,
      received: issue.message,
      code: issue.code,
      path: issue.path,
      message: issue.message,
    }));
    errorDetails = {
      issues,
      name: err.name,
    };
    stack = err.stack;
  } else if (
    (err as any).name === "MongoError" &&
    (err as any).code === 11000
  ) {
    statusCode = 409;
    errorMessage = "Duplicate Entry";
    errorDetails = (err as any).keyValue;
  } else {
    errorMessage = err.message || "Unexpected error occurred";
    errorDetails = "Unexpected error occurred";
    stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    errorMessage,
    errorDetails,
    stack,
  });
};

export default errorHandler;
