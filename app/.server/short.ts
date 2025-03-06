import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
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
      console.log("🚀 ~ short.ts:18 ~ storeUrl ~ Url already exists ⚠️");
      const existingDoc = existingDocs.docs[0].data();
      return `https://tny-lnkr.com/${existingDoc.shortCode}`;
    }

    const shortCode = generateShortCode();

    const docRef = await addDoc(collection(db, "links"), {
      url,
      shortCode,
      createdAt: serverTimestamp(),
    });

    console.log("🚀 ~ short.ts:11 ~ storeUrl ~ Success ✅", shortCode);
    return `https://tny-lnkr.com/${shortCode}`;
  } catch (error) {
    console.log("🚀 ~ short.ts:13 ~ storeUrl ~ error:", error);
    throw new Error("Failed to strore URL");
  }
}
