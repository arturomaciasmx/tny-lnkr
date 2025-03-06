import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { customAlphabet } from "nanoid";

export async function storeUrl(url: string) {
  const generateShortCode = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    6
  );

  try {
    const existingQuery = query(collection(db, "links"), where("url", "==", url));
    const existingDocs = await getDocs(existingQuery);

    if (!existingDocs.empty) {
      const existingDoc = existingDocs.docs[0].data();
      return `https://tny-lnkr.com/${existingDoc.shortCode}`;
    }

    const shortCode = generateShortCode();

    await addDoc(collection(db, "links"), {
      url,
      shortCode,
      createdAt: serverTimestamp(),
    });

    return `https://tny-lnkr.com/${shortCode}`;
  } catch (error) {
    throw new Error("Failed to strore URL");
  }
}

export async function getUrl(shortCode: string) {
  try {
    const linksRef = collection(db, "links");
    const q = query(linksRef, where("shortCode", "==", shortCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const docRef = doc(db, "links", docSnapshot.id);
      const data = docSnapshot.data();
      const url = data.url;

      // increment hits account
      await updateDoc(docRef, { hits: (data.hits || 0) + 1 });

      return { ok: true, url };
    }
  } catch (error) {
    throw new Error("Error fetching url");
  }
}
