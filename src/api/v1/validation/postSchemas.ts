import Joi from "joi";

// Post operation schemas organized by request part
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
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general").optional().messages({
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