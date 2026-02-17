import { db } from "../../../../config/firebaseConfig";

export const createDocument = async <T>(
    collectionName: string,
    data: Partial<T>
): Promise<string> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;
        docRef = await db.collection(collectionName).add(data);

        return docRef.id;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

export const getAllDocuments = async <T>(collectionName: string): Promise<T[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();
        
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve documents from ${collectionName}: ${errorMessage}`
        );
    }
};

export const getDocById = async <T>(collectionName: string, id: string): Promise<T | null> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;
        
        docRef = await db.collection(collectionName).doc(id);

        const snapshot = await docRef.get();

        if (!snapshot) {
            return null;
        }

        return { 
            id: snapshot.id,
            ... (snapshot.data() as T)
        };

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve document with ID ${id} from ${collectionName}: ${errorMessage}`
        );
    }
};

export const updateDocument = async <T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(data);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update document with ID ${id} in ${collectionName}: ${errorMessage}`
        );
    }
};

export const deleteDocument = async (
    collectionName: string,
    id: string,
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).delete();
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete document with ID ${id} from ${collectionName}: ${errorMessage}`
        );
    }   
};