import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ResponseUtil } from "../utils/response";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return ResponseUtil.error(
        res,
        "Validation failed",
        400,
        errors.join(", "),
      );
    }

    req.body = value;
    next();
  };
};
