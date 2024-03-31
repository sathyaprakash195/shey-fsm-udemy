import firebaseApp from "@/config/firebase-connection";
import { uploadBytes, ref, getDownloadURL, getStorage } from "firebase/storage";

export const uploadFileToFirebaseAndReturnUrl = async (file: File) => {
  try {
    const storageRef = getStorage(firebaseApp);
    const fileRef = ref(storageRef, file.name);
    const snapshot = await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
