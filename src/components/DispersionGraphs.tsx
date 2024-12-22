import { BaseTabs } from "./base/BaseTabs";
import { BestShotDispersionGraph } from "./panels/graphs/BestShotDispersionGraph";
import { ShotDispersionGraph } from "./panels/graphs/ShotDispersionGraph";
import { OutlierDetectionSettings } from "./panels/OutlierDetectionSettings";

export const DispersionGraphs = () => {
  if (import.meta.env.DEV) {
    return (
      <div className="flex h-auto flex-col gap-3 rounded-xl bg-white p-4">
        <BaseTabs
          categories={{
            "All Shots": [
              {
                id: 1,
                content: (
                  <div>
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-800">
                        Shot Dispersion
                      </h4>
                      <OutlierDetectionSettings />
                    </div>
                    <ShotDispersionGraph />
                  </div>
                ),
              },
            ],
            "Best Shot Dispersion": [
              {
                id: 2,
                content: (
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      Best Shot Dispersion
                    </h4>
                    <BestShotDispersionGraph />
                  </div>
                ),
              },
            ],
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-800">Shot Dispersion</h4>
        <OutlierDetectionSettings />
      </div>
      <ShotDispersionGraph />
    </div>
  );
};
