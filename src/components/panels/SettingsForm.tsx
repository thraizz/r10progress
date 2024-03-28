import { useContext } from "react";
import { SettingsContext } from "../../provider/SettingsContext";

export const SettingsForm = () => {
  const { useIQR, setUseIQR } = useContext(SettingsContext);

  return (
    <div className="mt-4">
      <label className="block">
        <input
          type="checkbox"
          checked={useIQR}
          onChange={(e) => setUseIQR(e.target.checked)}
        />
        <span className="ml-2">Use IQR for outliers detection</span>
      </label>
    </div>
  );
};
