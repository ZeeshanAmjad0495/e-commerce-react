import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAkf_qdZdBjB_cbZTw2msn-yKlXv-gNpas",
  authDomain: "crwn-clothing-29bc6.firebaseapp.com",
  databaseURL: "https://crwn-clothing-29bc6-default-rtdb.firebaseio.com",
  projectId: "crwn-clothing-29bc6",
  storageBucket: "crwn-clothing-29bc6.appspot.com",
  messagingSenderId: "24054585825",
  appId: "1:24054585825:web:013b5c34d24b9892c91aa0",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
