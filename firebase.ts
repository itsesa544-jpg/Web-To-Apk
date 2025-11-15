import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, type UserCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnnqn6vObQN4Vyw-h0-TwlWwehk2HT67U",
    authDomain: "web-to-apk-bb0a7.firebaseapp.com",
    databaseURL: "https://web-to-apk-bb0a7-default-rtdb.firebaseio.com",
    projectId: "web-to-apk-bb0a7",
    storageBucket: "web-to-apk-bb0a7.appspot.com",
    messagingSenderId: "353011971968",
    appId: "1:353011971968:web:1f1c0c9d9ad4c7a2fab365"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');


export const signInWithGoogle = async () => {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    return { user: result.user, token };
};

export const logout = () => {
    return signOut(auth);
};

export { onAuthStateChanged };