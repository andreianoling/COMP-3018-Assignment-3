import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/postController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Test Workshop"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Must be a future date
 *                 example: "2026-06-15T10:00:00Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 50
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 description: Cannot exceed capacity
 *                 example: 0
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 default: active
 *                 example: "active"
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "workshop"
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateRequest(postSchemas.create), postController.createPostHandler);

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Events retrieved"
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 */
router.get("/", postController.getAllPostsHandler);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *         example: "abc123"
 *     responses:
 *       '200':
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event Retrieved"
 *                 data:
 *                   type: object
 *                   properties:
 *                     post:
 *                       $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateRequest(postSchemas.getById), postController.getPostByIdHandler);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *         example: "abc123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             description: At least one field must be provided
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Workshop"
 *               date:
 *                 type: string
 *                 example: "2026-07-01T09:00:00Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 100
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 example: 10
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "cancelled"
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "seminar"
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedPost:
 *                       $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateRequest(postSchemas.update), postController.updatePostHandler);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *         example: "abc123"
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event deleted"
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateRequest(postSchemas.delete), postController.deletePostHandler);

export default router;