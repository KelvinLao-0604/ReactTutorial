// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEuqbS2fife_APAeCLrUBpHHzsOprJoTw",
  authDomain: "reacttutorial-be2ad.firebaseapp.com",
  databaseURL: "https://reacttutorial-be2ad-default-rtdb.firebaseio.com",
  projectId: "reacttutorial-be2ad",
  storageBucket: "reacttutorial-be2ad.appspot.com",
  messagingSenderId: "1035877304039",
  appId: "1:1035877304039:web:9328ca28f66f8bd3928442",
  measurementId: "G-ZD4TE0N2JL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

export const setData = (path, value) => (
    set(ref(database, path), value)
  );