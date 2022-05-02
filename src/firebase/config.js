import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAC_GTfjWft9JKpWKR0bGuN0qU1OIwRebk",
  authDomain: "tashiev-react-realtime-chat.firebaseapp.com",
  projectId: "tashiev-react-realtime-chat",
  storageBucket: "tashiev-react-realtime-chat.appspot.com",
  messagingSenderId: "599290779439",
  appId: "1:599290779439:web:01b3e9cf13904dc487f3da",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
