import { Router } from "express";
const router = Router();

// @route   GET /api/posts/test
// @desc    Tests posts route
// @access  Public

router.get(
    "/test",
    (req, res): void => {
        res.send({ message: "Posts works" });
    }
);

export default router;
