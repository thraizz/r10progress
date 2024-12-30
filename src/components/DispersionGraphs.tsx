import { BaseTabs } from "./base/BaseTabs";
import { DispersionCirclesGraph } from "./panels/graphs/DispersionCirclesGraph";
import { ShotScatterGraph } from "./panels/graphs/ShotScatterGraph";
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
                <ShotScatterGraph />
              </div>
            ),
          },
        ],
        "Dispersion Circle Graph": [
          {
            id: 2,
            content: (
              <div>
                <h4 className="text-xl font-bold text-gray-800">
                  Dispersion Circle Graph
                </h4>
                <DispersionCirclesGraph />
              </div>
            ),
          },
        ],
      }}
    />
  </div>
);
