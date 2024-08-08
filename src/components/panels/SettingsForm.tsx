import { useContext } from "react";
import { SettingsContext, SettingsType } from "../../provider/SettingsContext";

export const SettingsForm = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const changeIqr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev: SettingsType) => ({
      ...prev,
      useIQR: e.target.checked,
    }));
  };

  const changeUseAboveAverageShots = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSettings((prev: SettingsType) => ({
      ...prev,
      useAboveAverageShots: e.target.checked,
    }));
  };

  return (
    <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:gap-4">
      <label className="block">
        <input
          type="checkbox"
          checked={settings.useIQR}
          onChange={(e) => changeIqr(e)}
        />
        <span className="ml-2">Use IQR for outliers detection</span>
      </label>
      <label className="block">
        <input
          type="checkbox"
          checked={settings.useAboveAverageShots}
          onChange={(e) => changeUseAboveAverageShots(e)}
        />
        <span className="ml-2">Use above-average shots</span>
      </label>
    </div>
  );
};
