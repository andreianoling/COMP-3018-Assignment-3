import { db } from "../../../../config/firebaseConfig";
import { Timestamp } from "firebase-admin/firestore";

// Converts Firestore Timestamps to ISO
const convertTimestamps = (data: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(data)) {
        const value = data[key];
        if (value instanceof Timestamp) {
            result[key] = value.toDate().toISOString();
        } else {
            result[key] = value;
        }
    }
    return result;
};

export const createDocument = async <T>(
    collectionName: string,
    data: Partial<T>,
    idCount?: string
): Promise<string> => {
    try {
        if (idCount) {
            // Use a transaction to generate new id based on count
            const counterRef = db.collection("counters").doc(collectionName);

            const generateId = await db.runTransaction(async (transaction) => {
                const getCount = await transaction.get(counterRef);
                const currentCount: number = getCount.exists ? (getCount.data()!.count as number) : 0;
                const newCount = currentCount + 1;
                const newId = `${idCount}${String(newCount).padStart(6, "0")}`;0

                transaction.set(counterRef, { count: newCount });
                transaction.set(db.collection(collectionName).doc(newId), data as FirebaseFirestore.DocumentData);

                return newId;
            });

            return generateId;
        }

        // Default: let Firestore auto-generate the ID
        const docRef = await db.collection(collectionName).add(data);
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
        
        return snapshot.docs.map(doc => ({ id: doc.id, ...convertTimestamps(doc.data() as Record<string, unknown>) } as T));
    
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
            ...convertTimestamps(snapshot.data() as Record<string, unknown>)
        } as T;

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