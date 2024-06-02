import { BasePageLayout } from "../components/base/BasePageLayout";
import { AveragesPerSession } from "../components/panels/AveragesPerSession";
import { ShotDispersion } from "../components/panels/ShotDispersion";
import { ShotScatterPlot } from "../components/panels/ShotScatterPlot";

export const Visualization = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Visualization</h2>
    <div className="mt-2">
      <ShotDispersion />
      <AveragesPerSession />
      <hr className="my-6" />
      <ShotScatterPlot />
    </div>
  </BasePageLayout>
);
