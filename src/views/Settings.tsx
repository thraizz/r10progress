import { SessionList } from "../components/SessionList";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { OutlierDetectionSettings } from "../components/panels/OutlierDetectionSettings";
import { TrackingSettings } from "../components/panels/TrackingSettings";
import { UnitSettings } from "../components/panels/UnitSettings";

export const Settings = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Settings</h2>

    <div className="flex flex-col gap-8">
      <section>
        <h3 className="mb-4 text-xl font-semibold">Unit Settings</h3>
        <UnitSettings />
      </section>

      <section>
        <h3 className="mb-4 text-xl font-semibold">Outlier Detection</h3>
        <OutlierDetectionSettings />
      </section>

      <section>
        <h3 className="mb-4 text-xl font-semibold">Privacy Settings</h3>
        <TrackingSettings />
      </section>

      <section>
        <h3 className="mb-4 text-xl font-semibold">Sessions</h3>
        <SessionList />
      </section>

      <p className="text-sm text-gray-500">
        Version: {import.meta.env.VITE_VERSION ?? "None"}
      </p>
    </div>
  </BasePageLayout>
);
