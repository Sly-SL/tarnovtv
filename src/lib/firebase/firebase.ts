// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {CONSTANTS} from "@/shared/consts/consts.consts";
import {deleteDoc, doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {AllCollectionsType} from "@/shared/types/all-collections.type";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: CONSTANTS.FIREBASE.apiKey,
    authDomain: CONSTANTS.FIREBASE.authDomain,
    projectId: CONSTANTS.FIREBASE.projectId,
    storageBucket: CONSTANTS.FIREBASE.storageBucket,
    messagingSenderId: CONSTANTS.FIREBASE.messagingSenderId,
    appId: CONSTANTS.FIREBASE.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDataWithCustomId(collectionName: AllCollectionsType, docId: string, data: unknown) {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
    console.log("Dodano/zaktualizowano dokument o ID:", docId);
}

async function deleteDocument(collectionName: AllCollectionsType, docId: string) {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Usunięto dokument:", docId);
}

async function updateDocumentField(collectionName: AllCollectionsType, docId: string, field: string, value: unknown) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
        [field]: value
    });
    console.log("Zaktualizowano dokument:", docId);
}

export { db, addDataWithCustomId,updateDocumentField,deleteDocument};