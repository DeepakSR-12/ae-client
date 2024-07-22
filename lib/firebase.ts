import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: "aloha-earn.firebaseapp.com",
  projectId: "aloha-earn",
  storageBucket: "aloha-earn.appspot.com",
  messagingSenderId: "116075862682",
  appId: process.env.FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFileDownloadURL = async (filePath: string): Promise<string> => {
  try {
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw error;
  }
};

export const uploadImageToFirebase = async (
  file: File,
  maxRetries = 3
): Promise<string> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const uniqueId = uuidv4();
      const filePath = `ai-images/${uniqueId}-${file.name}`;
      const storageRef = ref(storage, filePath);
      uploadBytesResumable(storageRef, file);
      return filePath;
    } catch (error) {
      console.error(`Upload attempt ${attempt + 1} failed:`, error);
      if (attempt === maxRetries - 1) throw error;
      await delay(1000 * Math.pow(2, attempt));
    }
  }

  throw new Error("Failed to upload file after maximum retries");
};
