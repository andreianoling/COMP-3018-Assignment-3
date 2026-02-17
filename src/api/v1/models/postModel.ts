export interface CreatePostInput {
    name: string;
    date: string;
    capacity: number;
    registrationCount?: number;
    status?: string;
    category?: string;
}

export interface Post {
    id: string;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
    status: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}