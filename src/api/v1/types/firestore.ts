import { FieldValue } from "firebase-admin/firestore";

export type FirestoreDataTypes = 
    | string
    | number
    | boolean
    | null
    | Date
    | FieldValue;