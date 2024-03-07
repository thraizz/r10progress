import { AveragesPerSession } from "./AveragesPerSession";
import { AveragesScatterPlot } from "./AveragesScatterPlot";

export const Visualization = () => (
  <div className="mt-2">
    <AveragesPerSession />
    <hr className="my-6" />
    <AveragesScatterPlot />
  </div>
);
