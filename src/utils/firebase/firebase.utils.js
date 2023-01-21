import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBRFSq0q4slXbEsrutrXd6nMPtpGGFCzEo",
    authDomain: "kracz-clothing-co.firebaseapp.com",
    projectId: "kracz-clothing-co",
    storageBucket: "kracz-clothing-co.appspot.com",
    messagingSenderId: "613207339798",
    appId: "1:613207339798:web:72376e6acdd1476fc5d637"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGoogelPopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.user.uid);
    console.log(userAuth);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth.user;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log("issue creating the user", error)
        }
    }
}