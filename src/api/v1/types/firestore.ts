import { FieldValue } from "firebase-admin/firestore";

export type FirestoreDataTypes = 
    | string
    | number
    | boolean
    | Date
    | FieldValue;