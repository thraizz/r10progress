import { useContext } from "react";
import { Link } from "react-router-dom";
import { SettingsContext } from "../provider/SettingsContext";

export const IQRNote = () => {
  const { useIQR } = useContext(SettingsContext);
  return (
    <div className="flex flex-row gap-1">
      <p className="text-sm text-gray-500">
        {useIQR
          ? "The averages are calculated using the Interquartile Range (IQR) method."
          : "The averages are calculated across all shots."}
      </p>
      <Link to={"/settings"} className="text-sm text-blue-500 hover:underline">
        Change settings
      </Link>
    </div>
  );
};
