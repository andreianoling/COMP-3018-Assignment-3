export interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
}

export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

export interface CreatePostResponse {
    message: string;
    data: {
        id: string;
        name: string;
        date: string;
        capacity: number;
        registrationCount: number;
        status: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
    };
}