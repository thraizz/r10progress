import { SessionList } from "../components/SessionList";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { OutlierDetectionSettings } from "../components/panels/OutlierDetectionSettings";
import { UnitSettings } from "../components/panels/UnitSettings";

export const Settings = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Settings</h2>

    <h3 className="text-xl font-semibold">Unit Settings</h3>
    <UnitSettings />
    <h3 className="text-xl font-semibold">Outlier Detection</h3>
    <OutlierDetectionSettings />
    <SessionList />
    <p>Version: {import.meta.env.VITE_VERSION ?? "None"}</p>
  </BasePageLayout>
);
