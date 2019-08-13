import User from "../models/User";
import logger from "../logger";
import bcrypt from "bcryptjs";
import { IErrors } from "./errors";

// Register a new user
export function registerUser(req: any, res: any): any {
    const errors: IErrors = {};
    const { email, name, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            // If email is already in use send error
            if (user) {
                errors.email = "Email is already in use on this site";
                return res.status(400).json(errors);
            } else {
                // Otherwise create new user

                // TODO hash password
                return bcrypt.hash(password, 12);
            }
        })
        .then(hashedPassword => {
            const newUser = new User({ email, name, password: hashedPassword });
            newUser
                .save()
                .then(user => res.status(201).json(user))
                .catch(err => {
                    errors.db = "Could not save user to database";
                    res.status(400).json(errors);
                });
        })
        .catch(err => {
            errors.db = "Could not access db";
            res.status(400).json(errors.db);
            logger.log({
                level: "error",
                message: errors.db
            });
        });
}
