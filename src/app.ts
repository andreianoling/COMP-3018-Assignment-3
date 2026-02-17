import express from "express";
import router from "./api/v1/routes/postRoutes";

const app = express();

app.use(express.json());

app.use("/api/v1/posts", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;