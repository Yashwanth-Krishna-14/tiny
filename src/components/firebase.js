import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK9_JhIKeusAiDDAS1CphtX10arT5wrBo",
  authDomain: "resmgt-68bc6.firebaseapp.com",
  projectId: "resmgt-68bc6",
  storageBucket: "resmgt-68bc6.appspot.com",
  messagingSenderId: "30021522932",
  appId: "1:30021522932:web:f744886ceef4b7230bd5a1",
  measurementId: "G-9WBXF2KDFG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};

export { app, analytics, auth, db };