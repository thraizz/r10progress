import { BaseTabs } from "./base/BaseTabs";
import { AllShotsGraph } from "./panels/graphs/AllShotsGraph";
import { DispersionCirclesGraph } from "./panels/graphs/DispersionCirclesGraph";
import { OutlierDetectionSettings } from "./panels/OutlierDetectionSettings";

export const DispersionGraphs = () => (
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
                    Shot Visualization
                  </h4>
                  <OutlierDetectionSettings />
                </div>
                <AllShotsGraph />
              </div>
            ),
          },
        ],
        "Dispersion Circle Graph": [
          {
            id: 2,
            content: (
              <div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    Dispersion Circle Graph
                  </h4>
                  <OutlierDetectionSettings />
                </div>
                <DispersionCirclesGraph />
              </div>
            ),
          },
        ],
      }}
    />
  </div>
);
