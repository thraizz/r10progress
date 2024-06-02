import { useMemo } from "react";
import { Vega, VisualizationSpec } from "react-vega";
import { useSelectedSessionsWithSettings } from "../../hooks/useSelectedSessions";
import { GolfSwingData } from "../../types/GolfSwingData";
import { SettingsForm } from "./SettingsForm";

export const ShotDispersion = () => {
  const shots = useCarryAndDeviation();
  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { name: "table" },
    mark: "point",
    height: "container",
    width: "container",
    autosize: { resize: true },
    encoding: {
      x: {
        field: "x",
        title: "Deviation",
        type: "quantitative",
        // Should be centered at 0
        scale: { zero: true },
      },
      y: {
        field: "y",
        title: "Carry",
        type: "quantitative",
      },
      color: {
        field: "club",
        type: "nominal",
        title: "Club",
      },
    },
  };

  return (
    <div className="flex h-auto flex-col gap-3 rounded-xl bg-white p-4">
      <SettingsForm />
      <h4 className="mb-4 text-xl font-bold text-gray-800">Shot Dispersion</h4>
      <div className="block h-[400px] w-full">
        <Vega spec={spec} data={{ table: shots }} />
      </div>
    </div>
  );
};

const useCarryAndDeviation = () => {
  const sessions = useSelectedSessionsWithSettings();

  const shots = useMemo(() => {
    if (sessions) {
      const results = Object.values(sessions)
        .map((session) => session.results)
        .flat();
      return calculateCarryAndDeviation(results);
    }
    return [];
  }, [sessions]);

  return shots;
};

const calculateCarryAndDeviation = (results: GolfSwingData[]) => {
  return results.map((result) => {
    const carry = (
      result["Carry Distance"] || result["Carry-Distanz"]
    )?.toFixed(2);
    const deviation = (
      result["Carry Deviation Distance"] || result["Gesamtabweichungsdistanz"]
    )?.toFixed(2);
    const clubName = result["Schlägerart"] || result["Club Type"];
    return { y: carry, x: deviation, club: clubName };
  });
};
