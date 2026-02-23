export interface ApiResponse<T> {
    message?: string;
    count?: number;
    data?: T;
    error?: string;
}

export const successResponse = <T>(
    data?: T,
    message?: string,
    count?: number,
): ApiResponse<T> => ({
    message,
    ...(count !== undefined && { count }),
    data,
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