import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TrackingConsentContextInterface {
  hasConsented: boolean;
  setHasConsented: (value: boolean) => void;
  showConsentDialog: boolean;
  setShowConsentDialog: (value: boolean) => void;
}

const TrackingConsentContext = createContext<TrackingConsentContextInterface>({
  hasConsented: false,
  setHasConsented: () => {},
  showConsentDialog: false,
  setShowConsentDialog: () => {},
});

export const TrackingConsentProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    const stored = localStorage.getItem("tracking_consent");
    return stored === "true";
  });
  const [showConsentDialog, setShowConsentDialog] = useState<boolean>(false);

  useEffect(() => {
    // Show the dialog if consent hasn't been given yet and hasn't been explicitly declined
    const hasDeclined =
      localStorage.getItem("tracking_consent_declined") === "true";
    if (!hasConsented && !hasDeclined) {
      setShowConsentDialog(true);
    }
  }, [hasConsented]);

  useEffect(() => {
    // Store consent in localStorage
    localStorage.setItem("tracking_consent", hasConsented.toString());

    // If consent is given, add the Mouseflow script
    if (hasConsented) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.defer = true;
      script.src =
        "//cdn.mouseflow.com/projects/36f43937-3dfb-4ac0-aaa8-fcc6ee3d4434.js";
      document.head.appendChild(script);
      window._mfq = window._mfq || [];
      // Clear declined state if user later accepts
      localStorage.removeItem("tracking_consent_declined");
    }
  }, [hasConsented]);

  const handleSetHasConsented = (value: boolean) => {
    setHasConsented(value);
    if (!value) {
      // If explicitly declined, store that in localStorage
      localStorage.setItem("tracking_consent_declined", "true");
    }
  };

  return (
    <TrackingConsentContext.Provider
      value={{
        hasConsented,
        setHasConsented: handleSetHasConsented,
        showConsentDialog,
        setShowConsentDialog,
      }}
    >
      {children}
    </TrackingConsentContext.Provider>
  );
};

export const useTrackingConsent = () => useContext(TrackingConsentContext);
