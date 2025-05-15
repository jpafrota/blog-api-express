import express from "express";

const router = express.Router();

// list all posts
router.get("/", (req, res) => {});

// create a new post
router.post("/", (req, res) => {});

// find post by id
router.get("/:id", (req, res) => {});

// delete post by id
router.delete("/:id", (req, res) => {});

// update post by id
router.patch("/:id", (req, res) => {});

export default router;
