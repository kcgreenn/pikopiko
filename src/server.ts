import express from "express";
import logger from "./logger";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import userRoutes from "./routes/users";
import profileRoutes from "./routes/profile";
import postsRoutes from "./routes/posts";

const app = express();
dotenv.config();

// App middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to db
const db: string | undefined = process.env.MONGO_URI;
if (db !== undefined) {
    mongoose
        .connect(db, { useNewUrlParser: true })
        .then(() =>
            logger.log({
                level: "info",
                message: "Connected to db"
            })
        )
        .catch(error =>
            logger.log({
                level: "error",
                message: "Could not connect to db"
            })
        );
}

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);

const port = process.env.PORT || 5000;

app.listen(
    port,
    (): void => {
        logger.log({
            level: "info",
            message: `Server started on port: ${port}`
        });
    }
);
