import { BasePageLayout } from "../components/base/BasePageLayout";
import { AveragesPerSession } from "../components/panels/AveragesPerSession";
import { ShotDispersionGraph } from "../components/panels/graphs/ShotDispersionGraph";
import { ShotScatterPlot } from "../components/panels/ShotScatterPlot";

export const Visualization = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Visualization</h2>
    <div className="flex flex-col gap-6">
      <ShotDispersionGraph />
      <AveragesPerSession />
      <ShotScatterPlot />
    </div>
  </BasePageLayout>
);
