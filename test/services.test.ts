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