import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { config } from "react-native-dotenv"; 

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth.setPersistence(browserLocalPersistence)
  .then(() => {})
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error);
  });

const db = getFirestore(app);

export { auth, db, doc, getDoc };