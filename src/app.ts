import express from "express";
import router from "./api/v1/routes/postRoutes";
import morgan from "morgan";


import { helmetConfig } from "../config/helmetConfig";
import cors from "cors";
import { corsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";


const app = express();

app.use(cors(corsOptions()));

app.use(helmetConfig());

app.use(express.json());

setupSwagger(app)

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