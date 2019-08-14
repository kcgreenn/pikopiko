"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = tslib_1.__importDefault(require("../models/User"));
const logger_1 = tslib_1.__importDefault(require("../logger"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
function registerUser(req, res) {
    const errors = {};
    const { email, name, password, password2 } = req.body;
    if (password !== password2) {
        errors.password2 = "Passwords must match";
        res.status(400).json(errors);
    }
    User_1.default.findOne({ email })
        .then((user) => {
        if (user) {
            errors.email = "Email is already in use on this site";
            return res.status(400).json(errors);
        }
        bcryptjs_1.default
            .hash(password, 12)
            .then((hashedPassword) => {
            const newUser = new User_1.default({
                email,
                name,
                password: hashedPassword
            });
            newUser
                .save()
                .then((user) => {
                return res.status(201).json(user);
            })
                .catch((err) => {
                logger_1.default.log({ level: "error", message: err });
                errors.db = "Server could not save resource";
                return res.status(400).json(errors);
            });
        })
            .catch((err) => {
            logger_1.default.log({ level: "error", message: err });
            errors.db = "Server could not complete request";
            return res.status(400).json(errors);
        });
    })
        .catch((err) => {
        logger_1.default.log({ level: "error", message: err });
        errors.db = "Server could not complete request";
        return res.status(400).json(errors);
    });
}
exports.registerUser = registerUser;
//# sourceMappingURL=auth.js.map