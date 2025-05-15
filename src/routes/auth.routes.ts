import { NextFunction, Request, Response, Router } from "express";

const router = Router();

// login, return jwt
router.post("/login");

// register user, return jwt
router.post("/register");

// send reset password code to email
router.post("/reset-password-code");

// validate reset password code
router.post("/validate-code");

export default router;
