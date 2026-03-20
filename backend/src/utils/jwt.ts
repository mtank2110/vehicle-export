import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { UserRole } from "../types/common.types";

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE as any,
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE as any,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
