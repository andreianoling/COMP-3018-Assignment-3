import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            date: Joi.string().required().messages({
                "any.required": "Date is required",
                "string.empty": "Date cannot be empty",
            }),
            capacity: Joi.number().integer().min(1).required().messages({
                "any.required": "Capacity is required",
                "number.base": "Capacity must be a number",
                "number.min": "Capacity must be at least 1",
            }),
            registrationCount: Joi.number().integer().min(0).optional(),
            status: Joi.string().optional(),
            category: Joi.string().optional(),
        }),
    },

    // GET /posts/:id - Get single post
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
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
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
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
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
            }),
        }),
    },
};