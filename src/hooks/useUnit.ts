import { useContext } from "react";
import { SettingsContext } from "../provider/SettingsContext";

export const useUnit = () => {
  const { settings } = useContext(SettingsContext);
  return settings.unit === "meters" ? "m" : "yds";
};
