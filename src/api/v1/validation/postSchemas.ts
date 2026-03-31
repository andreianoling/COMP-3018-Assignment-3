import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - date
 *         - capacity
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the event
 *           example: "abc123"
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Name of the event
 *           example: "Test Workshop"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event, must be in the future on create
 *           example: "2026-06-15T10:00:00Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           description: Maximum number of attendees
 *           example: 50
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           description: Current number of registrations, cannot exceed capacity
 *           example: 12
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           default: active
 *           description: Current status of the event
 *           example: "active"
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           description: Category of the event
 *           example: "workshop"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the event was created
 *           example: "2026-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the event was last updated
 *           example: "2026-01-20T14:45:00Z"
 */
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": "\"name\" is required",
                "string.empty": "\"name\" is required",
                "string.min": "\"name\" length must be at least 3 characters long",
            }),
            date: Joi.date().greater("now").required().messages({
                "any.required": "\"date\" is required",
                "date.base": "\"date\" must be a valid date",
                "date.greater": "\"date\" must be greater than \"now\"",
            }),
            capacity: Joi.number().integer().min(5).required().messages({
                "any.required": "\"capacity\" is required",
                "number.base": "\"capacity\" must be an integer",
                "number.integer": "\"capacity\" must be an integer",
                "number.min": "\"capacity\" must be greater than or equal to 5",
            }),
            registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).default(0).optional().messages({
                "number.max": "\"registrationCount\" must be less than or equal to ref:capacity",
            }),
            status: Joi.string().valid("active", "cancelled", "completed").default("active").optional().messages({
                "any.only": "\"status\" must be one of [active, cancelled, completed]",
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").required().messages({
                "any.only": "\"category\" must be one of [conference, workshop, meetup, seminar, general]",
            }),
        }),
    },

    // GET /posts/:id - Get single post
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },

    // PUT /posts/:id - Update post
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            date: Joi.string().optional(),
            capacity: Joi.number().integer().min(1).optional(),
            registrationCount: Joi.number().integer().min(0).optional(),
            status: Joi.string().optional(),
            category: Joi.string().optional(),
        }).min(1).messages({
            "object.min": "At least one field must be provided to update",
        }),
    },

    // DELETE /posts/:id - Delete post
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: A message describing the validation or not-found error
 *           example: "Validation error: \"name\" is required, \"capacity\" must be an integer"
 */