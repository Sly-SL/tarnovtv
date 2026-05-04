import {getApp, getApps, initializeApp} from "firebase/app";
import {CONSTANTS} from "@/shared/consts/consts.consts";

const firebaseConfig = {
    apiKey: CONSTANTS.FIREBASE.apiKey,
    authDomain: CONSTANTS.FIREBASE.authDomain,
    projectId: CONSTANTS.FIREBASE.projectId,
    storageBucket: CONSTANTS.FIREBASE.storageBucket,
    messagingSenderId: CONSTANTS.FIREBASE.messagingSenderId,
    appId: CONSTANTS.FIREBASE.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export {app};