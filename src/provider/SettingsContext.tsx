import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";
import { UserContext } from "./UserContext";

export type SettingsType = {
  useIQR: boolean;
  useAboveAverageShots: boolean;
  unit: "meters" | "yards";
};

interface SettingsContextProps {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
  isLoading: boolean;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: {
    useIQR: false,
    useAboveAverageShots: false,
    unit: "meters",
  },
  setSettings: () => {},
  isLoading: true,
});

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<SettingsType>({
    useIQR: false,
    useAboveAverageShots: false,
    unit: "meters",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user || user.isAnonymous) return;
    const uuid = user?.uid;

    const settingsRef = doc(db, `r10data/${uuid}/settings/preferences`);

    // Subscribe to settings changes
    const unsubscribe = onSnapshot(settingsRef, (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as SettingsType);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync settings to Firestore
  useEffect(() => {
    if (!user || isLoading) return;

    const settingsRef = doc(db, `r10data/${user.uid}/settings/preferences`);
    setDoc(settingsRef, settings, { merge: true });
  }, [settings, user, isLoading]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};
