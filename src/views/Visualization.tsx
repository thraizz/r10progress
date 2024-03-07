import { BasePageLayout } from "../components/base/BasePageLayout";
import { Visualization as _Visualization } from "../components/panels/Visualization";

export const Visualization = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Visualization</h2>
    <_Visualization />
  </BasePageLayout>
);
