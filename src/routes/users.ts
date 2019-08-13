import { Router } from "express";
const router = Router();

import { registerUser } from "../controllers/auth";

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get(
    "/test",
    (req, res): void => {
        res.send({ message: "Users works" });
    }
);

// @route   POST api/users/register
// @desc    Register new user
// @access  Public

router.post("/register", registerUser);

export default router;
