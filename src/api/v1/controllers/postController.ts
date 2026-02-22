import { Request, Response, NextFunction } from "express";
import * as postService from "../services/postService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Handles creating new Post
export const createPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, date, capacity, registrationCount, status, category } = req.body;
        const postData = { name, date, capacity, registrationCount, status, category };

        const newPost = await postService.createPost(postData);

        res.status(HTTP_STATUS.CREATED).json(successResponse({newPost}, "Event created"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to get all posts
export const getAllPostsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const posts = await postService.getAllPosts();

        res.status(HTTP_STATUS.OK).json(successResponse({ posts }, "Events retrieved", posts.length));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to get a single post by Id
export const getPostByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({post}, "Event Retreived"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to update an exsting post
export const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, date, capacity, registrationCount, status, category } = req.body;

        const updatePostData = { name, date, capacity, registrationCount, status, category };

        const updatedPost = await postService.updatePost(id as string, updatePostData);

        res.status(HTTP_STATUS.OK).json(successResponse({updatedPost}, "Event updated"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles request to delete an exsting post
export const deletePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;
        await postService.deletePost(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse(undefined,"Post deleted"));
    } catch (error: unknown) {
        next(error);
    }
};