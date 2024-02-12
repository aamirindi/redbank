import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "firebase-api-key",
  authDomain: "red-bank-81590.firebaseapp.com",
  projectId: "red-bank-81590",
  storageBucket: "red-bank-81590.appspot.com",
  messagingSenderId: "587877308003",
  appId: "1:587877308003:web:634af2eba52f731cf58a56",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
