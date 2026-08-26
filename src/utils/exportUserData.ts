import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

/** Subcollections below r10data/{uid} that hold user data. */
const USER_SUBCOLLECTIONS = ["data", "reports", "settings"] as const;

export interface UserDataExport {
  exportedAt: string;
  account: {
    uid: string;
    email: string | null;
    createdAt?: string;
    lastSignInAt?: string;
  };
  collections: Record<string, Record<string, unknown>>;
}

/**
 * Reads everything we store for the given user and returns it as a plain
 * object, so it can be handed out as a data export (GDPR Art. 15 and 20).
 */
export const buildUserDataExport = async (
  user: User,
): Promise<UserDataExport> => {
  const collections: Record<string, Record<string, unknown>> = {};

  for (const subCollection of USER_SUBCOLLECTIONS) {
    const snapshot = await getDocs(
      collection(db, "r10data", user.uid, subCollection),
    );
    collections[subCollection] = Object.fromEntries(
      snapshot.docs.map((document) => [document.id, document.data()]),
    );
  }

  return {
    exportedAt: new Date().toISOString(),
    account: {
      uid: user.uid,
      email: user.email,
      createdAt: user.metadata.creationTime,
      lastSignInAt: user.metadata.lastSignInTime,
    },
    collections,
  };
};

/** Builds the export and saves it as a JSON file in the browser. */
export const downloadUserDataExport = async (user: User): Promise<void> => {
  const data = await buildUserDataExport(user);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `r10progress-export-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
