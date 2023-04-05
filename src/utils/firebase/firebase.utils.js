import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query, 
    getDocs,
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj)
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

    // as part of migrating to redux, you want to store the simplest form of data you get from BE in the store
    // the selector will perform the necessary transformations to format the data how you want it
    // so the following code is basically going to be handled by the selector now

    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});

    // return categoryMap;
}

export const createUserDocFromAuth = async (user, additionalInformation) => {
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(error) {
            console.log("issue creating the user", error)
        }
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    return await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)