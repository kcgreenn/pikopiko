import express from "express";
import logger from "./logger";

const app = express();

import userRoutes from "./routes/users";
import profileRoutes from "./routes/profile";
import postsRoutes from "./routes/posts";

app.get(
    "/",
    (req, res): void => {
        res.send("Hello World");
    }
);

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
