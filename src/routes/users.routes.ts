import { Router } from "express";

const router = Router();

// create a user
router.post("/", (req, res, next) => {});

// find all users
router.get("/", (req, res) => {});

// find user by id
router.get("/:id", (req, res, next) => {});

// update user's pwd
router.patch("/update-password", (req, res, next) => {});

export default router;
