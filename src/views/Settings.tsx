import { BasePageLayout } from "../components/base/BasePageLayout";
import { SettingsForm } from "../components/panels/SettingsForm";

export const Settings = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Settings</h2>
    <SettingsForm />
  </BasePageLayout>
);
