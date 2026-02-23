import * as postService from '../src/api/v1/services/postService';
import * as firestoreRepository from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('postService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe ('createPost', () => {
        it('should create a new post successfully', async () => {
            // Arange
            const postData = {
                name: 'Test Event',
                date: new Date(),
                capacity: 100,
            };
            
            const mockId = 'evt_123456';

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockId);
            
            // Act
            const result = await postService.createPost(postData);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                'posts',
                expect.objectContaining(postData),
                'evt_'
            );

            expect(result).toEqual(expect.objectContaining({
                id: mockId,
                ...postData,
                registrationCount: 0,
                status: 'active',
                category: 'general',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }));
        });
    });

    describe('getAllPosts', () => {
        it('should retrieve all posts successfully', async () => {
            // Arrange
            const mockPosts = [
                {
                    id: 'evt_123456',
                    name: 'Test Event',
                    date: new Date(),
                    capacity: 100,
                    registrationCount: 0,
                    status: 'active',
                    category: 'general',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ];

            (firestoreRepository.getAllDocuments as jest.Mock).mockResolvedValue(mockPosts);

            // Act
            const result = await postService.getAllPosts();

            // Assert
            expect(firestoreRepository.getAllDocuments).toHaveBeenCalledWith('posts');
            expect(result).toEqual(mockPosts);
        });
    });

    describe('getPostById', () => {
        it('should retrieve a post by ID successfully', async () => {
            // Arrange
            const mockPost = {
                id: 'evt_123456',
                name: 'Test Event',
                date: new Date(),
                capacity: 100,
                registrationCount: 0,
                status: 'active',
                category: 'general',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (firestoreRepository.getDocById as jest.Mock).mockResolvedValue(mockPost);

            // Act
            const result = await postService.getPostById('evt_123456');

            // Assert
            expect(firestoreRepository.getDocById).toHaveBeenCalledWith('posts', 'evt_123456');
            expect(result).toEqual(mockPost);
        });
    });

    describe('updatePost', () => {
        it('should update a post successfully', async () => {
            // Arrange
            const mockUpdatedPost = {
                id: 'evt_123456',
                name: 'Updated Event',
                date: new Date(),
                capacity: 100,
                registrationCount: 0,
                status: 'active',
                category: 'general',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);
            (firestoreRepository.getDocById as jest.Mock).mockResolvedValue(mockUpdatedPost);

            // Act
            const result = await postService.updatePost('evt_123456', {
                capacity: 1000,
            });

            // Assert
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                'posts',
                'evt_123456',
                expect.objectContaining({
                    capacity: 1000,
                    updatedAt: expect.any(Date),
                })
            );
            expect(result).toEqual(mockUpdatedPost);
        });
    });
});