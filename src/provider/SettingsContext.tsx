import { PropsWithChildren, createContext, useState } from "react";

import { ClubAverageStat } from "./settings.utils";

export type SettingsType = {
  useIQR: boolean;
  useAboveAverageShots: boolean;
  clubAverageStats: ClubAverageStat[];
};

interface SettingsContextProps {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: {
    useIQR: false,
    useAboveAverageShots: false,
    clubAverageStats: [] as any,
  },
  setSettings: () => { },
});

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<SettingsType>({
    useIQR: false,
    useAboveAverageShots: false,
    clubAverageStats: ["CARRY_DISTANCE"],
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
