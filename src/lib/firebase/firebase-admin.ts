import {cert, getApps, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import type {AllCollectionsType} from "@/shared/types/all/all-collections.type";

const app = getApps().length === 0
    ? initializeApp({
        credential: cert({
            projectId: CONSTANTS.FIREBASE.projectId,
            clientEmail: CONSTANTS.FIREBASE.clientEmail,
            privateKey: CONSTANTS.FIREBASE.privateKey?.replace(/\\n/g, "\n"),
        }),
    })
    : getApps()[0];

export const adminDb = getFirestore(app);

export async function addDataWithCustomId(collectionName: AllCollectionsType, docId: string, data: unknown) {
    await adminDb.collection(collectionName).doc(docId).set(data as object);
}

export async function deleteDocument(collectionName: AllCollectionsType, docId: string) {
    await adminDb.collection(collectionName).doc(docId).delete();
}

export async function updateDocument(collectionName: AllCollectionsType, docId: string, data: Partial<unknown>) {
    await adminDb.collection(collectionName).doc(docId).set(data as object, {merge: true});
}