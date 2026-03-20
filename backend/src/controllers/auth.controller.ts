import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseUtil } from "../utils/response";
import { RegisterDTO, LoginDTO } from "../dto/auth.dto";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: RegisterDTO = req.body;
      const result = await authService.register(data);
      return ResponseUtil.success(
        res,
        result,
        "User registered successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginDTO = req.body;
      const result = await authService.login(data);
      return ResponseUtil.success(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      return ResponseUtil.success(res, result, "Token refreshed successfully");
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.user!.id);
      return ResponseUtil.success(res, null, "Logout successful");
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.getProfile(req.user!.id);
      return ResponseUtil.success(res, user, "Profile fetched successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.updateProfile(req.user!.id, req.body);
      return ResponseUtil.success(res, user, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(
        req.user!.id,
        currentPassword,
        newPassword,
      );
      return ResponseUtil.success(res, null, "Password changed successfully");
    } catch (error) {
      next(error);
    }
  }
}
