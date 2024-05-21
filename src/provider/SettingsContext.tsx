import { PropsWithChildren, createContext, useState } from "react";

export type SettingsType = {
  useIQR: boolean;
  useAboveAverageShots: boolean;
};

interface SettingsContextProps {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: { useIQR: false, useAboveAverageShots: false },
  setSettings: () => {},
});

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<SettingsType>({
    useIQR: false,
    useAboveAverageShots: false,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
