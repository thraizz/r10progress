import { useContext, useMemo, useState } from "react";
import { PlainObject, Vega, VisualizationSpec } from "react-vega";
import { StyledListbox } from "./Listbox";
import { GolfSwingData, SessionContext } from "./SessionContext";
import { getAllDataFromSession } from "./getAllDataFromSession";

// create the spec for the scatter plot
const spec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { name: "table" },
  mark: "point",
  encoding: {
    x: { field: "x", type: "quantitative" },
    y: { field: "y", type: "quantitative" },
  },
};

export const AveragesScatterPlot = () => {
  const { sessions } = useContext(SessionContext);

  const [xField, setXField] = useState("Carry-Distanz");
  const [yField, setYField] = useState("Smash Factor");

  const fields = useMemo(() => {
    if (sessions) {
      return Object.keys(sessions[Object.keys(sessions)[0]].results[0]);
    }
    return [];
  }, [sessions]);

  const averages: PlainObject = useMemo(() => {
    if (sessions) {
      return {
        table: getAllDataFromSession(sessions).map((row) => ({
          x: row[xField as keyof GolfSwingData],
          y: row[yField as keyof GolfSwingData],
        })),
      };
    }
    return { table: [] };
  }, [sessions, xField, yField]);
  return (
    <div className="h-auto flex flex-col overflow-hidden gap-3">
      <StyledListbox options={fields} setOption={setXField} selected={xField} />
      <StyledListbox options={fields} setOption={setYField} selected={yField} />
      <Vega height={300} width={800} spec={spec} data={averages} />
    </div>
  );
};
