import { BasePageLayout } from "../components/base/BasePageLayout";
import { AllDataCombinedTable } from "../components/panels/AllDataCombinedTable";
import { AveragesTable } from "../components/panels/AveragesTable";

export const Sessions = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Sessions</h2>
    <AllDataCombinedTable />
    <AveragesTable />
  </BasePageLayout>
);
