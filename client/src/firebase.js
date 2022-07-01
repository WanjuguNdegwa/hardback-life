import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbJLA44ynwkAr0gHTiD4uhBxymfgYYx6k",
  authDomain: "hardback-life.firebaseapp.com",
  projectId: "hardback-life",
  storageBucket: "hardback-life.appspot.com",
  messagingSenderId: "91294659723",
  appId: "1:91294659723:web:194b7215b53979546ed08e"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
