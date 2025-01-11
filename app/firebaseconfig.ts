import { initializeApp, getApp, getApps } from "firebase/app"; // importando getApps
import { getAuth, browserLocalPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

auth.setPersistence(browserLocalPersistence)
  .then(() => {
  })
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error);
  });

const db = getFirestore(app);

export { auth, db, doc, getDoc, query, collection, where, getDocs };
