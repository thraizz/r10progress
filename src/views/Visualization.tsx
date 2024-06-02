import { BasePageLayout } from "../components/base/BasePageLayout";
import { AveragesPerSession } from "../components/panels/AveragesPerSession";
import { AveragesScatterPlot } from "../components/panels/AveragesScatterPlot";
import { ShotDispersion } from "../components/panels/ShotDispersion";

export const Visualization = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Visualization</h2>
    <div className="mt-2">
      <ShotDispersion />
      <AveragesPerSession />
      <hr className="my-6" />
      <AveragesScatterPlot />
    </div>
  </BasePageLayout>
);
