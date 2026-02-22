import express from "express";
import router from "./api/v1/routes/postRoutes";
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use("/api/v1/events", router);

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;