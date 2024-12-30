import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "#",
  authDomain: "#",
  projectId: "#",
  storageBucket: "#",
  messagingSenderId: "#",
  appId: "#"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth.setPersistence(browserLocalPersistence)
  .then(() => {
  })
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error);
  });

const db = getFirestore(app);

export { auth, db };
