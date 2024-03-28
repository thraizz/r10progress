import { PropsWithChildren, createContext, useState } from "react";

interface SettingsContextProps {
  useIQR: boolean;
  setUseIQR: (value: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
  useIQR: false,
  setUseIQR: () => {},
});

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [useIQR, setUseIQR] = useState<boolean>(false);

  return (
    <SettingsContext.Provider value={{ useIQR, setUseIQR }}>
      {children}
    </SettingsContext.Provider>
  );
};
