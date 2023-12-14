import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";

export type GolfSwingData = {
  Schlagflächenstellung: null | number | undefined;
  Luftdruck: number | null | undefined;
  Schlagfläche: null | number;
  Datum: string | null;
  Temperatur: number | null;
  Markierung: null | string;
  Luftdichte: number | null;
  Schwungbahn: null | number;
  Drehrate: number | null;
  "Smash Factor": number | null;
  Drehratentyp: string | null;
  Ballgeschwindigkeit: number | null;
  Gesamtabweichungswinkel: number | null;
  "Höhe des Scheitelpunkts": number | null;
  Gesamtabweichungsdistanz: number | null;
  Drehachse: number | null;
  "Carry-Abweichungsdistanz": number | null;
  Abflugrichtung: number | null;
  Backspin: number | null;
  Schlägername: null | string;
  "Carry-Abweichungswinkel": number | null;
  Sidespin: number | null;
  Gesamtstrecke: number | null;
  Spieler: string | null;
  Abflugwinkel: number | null;
  "Relative Luftfeuchtigkeit": number | null;
  "Schl.gsch.": number | null;
  Notiz: null | string;
  Schlägerart: string | null;
  Anstellwinkel: null | number;
  "Carry-Distanz": number | null;
};

export type Sessions = {
  [key: string]: {
    results: GolfSwingData[];
    selected: boolean;
  };
};

export interface SessionContextInterface {
  sessions: Sessions | null;
  setSession: (sessions: Sessions) => void;
}

const SessionContext = createContext<SessionContextInterface>({
  sessions: null,
  setSession: () => {},
});

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sessions, setSession] = useState<Sessions | null>(null);
  const memoizedValue = useMemo(
    () => ({
      sessions,
      setSession,
    }),
    [sessions, setSession],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
