import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../utils/response";
import { UserRole } from "../types/common.types";

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ResponseUtil.error(res, "Unauthorized", 401);
    }

    if (!roles.includes(req.user.role)) {
      return ResponseUtil.error(
        res,
        "Forbidden: Insufficient permissions",
        403,
      );
    }

    next();
  };
};
