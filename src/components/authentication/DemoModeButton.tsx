import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";

// Uses firebase anonymous authentication to log in as a demo user
export const DemoModeButton = () => {
  const trackDemoMode = () => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible?.("Demo mode");
    }
  };
  const handleClick = () => {
    signInAnonymously(auth);
    trackDemoMode();
  };
  return (
    <button className="text-sky-500 underline" onClick={handleClick}>
      Demo mode
    </button>
  );
};
