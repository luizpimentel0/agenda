import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDTO(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dtoClass, req.body);

    const errors = await validate(output);

    const errorConstraints = errors.map((err) => err.constraints);

    if (errors.length) {
      res.status(322).json({
        error: errorConstraints,
      });
      return;
    }

    req.body = output;
    next();
  };
}
