import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/postController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

router.post("/", validateRequest(postSchemas.create), postController.createPostHandler);
router.get("/", postController.getAllPostsHandler);
router.get("/:id", validateRequest(postSchemas.getById), postController.getPostByIdHandler);
router.put("/:id", validateRequest(postSchemas.update), postController.updatePostHandler);
router.delete("/:id", validateRequest(postSchemas.delete), postController.deletePostHandler);

export default router;