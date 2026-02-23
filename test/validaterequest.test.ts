import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import Joi from "joi";

describe("validateRequest Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("should pass for all minimum required fields", () => {
        //Arrange
        const testSchema = Joi.object({
            name: Joi.string().required(),
            date: Joi.date().required(),
            capacity: Joi.number().integer().required(),
        });

        mockReq.body = {
            name: "Test Event",
            date: new Date(),
            capacity: 100,
        };

        const middleware = validateRequest({ body: testSchema });

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
    });

    it("should return validation error for missing required fields", () => {
        // Arrange
        const testSchema = Joi.object({
            name: Joi.string().required(),
            date: Joi.date().required(),
            capacity: Joi.number().integer().required(),
        });
        mockReq.body = {
            name: "Test Event",
        };

        const middleware = validateRequest({ body: testSchema });

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            "error": "Validation error: Body: \"date\" is required, Body: \"capacity\" is required",
        });
    });

    it ("should return validation error for invalid capacity minimum", () => {
        // Arrange
        const testSchema = Joi.object({
            name: Joi.string().required(),
            date: Joi.date().required(),
            capacity: Joi.number().integer().min(5).required(),
        });
        mockReq.body = {
            name: "Test Event",
            date: new Date(),
            capacity: 1,
        };

        const middleware = validateRequest({ body: testSchema });

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            "error": "Validation error: Body: \"capacity\" must be greater than or equal to 5",
        });
    });
});
