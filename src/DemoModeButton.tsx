import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Uses firebase anonymous authentication to log in as a demo user
export const DemoModeButton = () => {
  return (
    <button
      className="text-sky-500 underline"
      onClick={() => signInAnonymously(auth)}
    >
      Demo mode
    </button>
  );
};
