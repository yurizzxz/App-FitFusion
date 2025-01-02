import { initializeApp, getApp, getApps } from "firebase/app"; // importando getApps
import { getAuth, browserLocalPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId
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
