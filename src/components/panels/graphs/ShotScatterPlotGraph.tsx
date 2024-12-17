import { GolfSwingData } from "../../../types/GolfSwingData.ts";

import { BaseGraph } from "../../base/BaseGraph.tsx";
import {
  chartOptionsDateTooltip,
  chartOptionsGrid,
  chartOptionsVisualRecencyMap,
  golfSwingDataAxisFormatter,
  PointWithDate,
} from "../../base/chartOptions.ts";

export const ShotScatterPlotGraph = ({
  xField,
  yField,
  chartData,
}: {
  xField: string;
  yField: string;
  chartData: PointWithDate[];
}) => {
  const chartOptions: echarts.EChartsOption = {
    grid: chartOptionsGrid,
    tooltip: chartOptionsDateTooltip(xField, yField),
    visualMap: chartOptionsVisualRecencyMap(chartData),
    xAxis: {
      type: "value",
      name: xField,
      axisLabel: {
        formatter: golfSwingDataAxisFormatter(xField as keyof GolfSwingData),
      },
    },
    yAxis: {
      type: "value",
      name: yField,
      axisLabel: {
        formatter: golfSwingDataAxisFormatter(yField as keyof GolfSwingData),
      },
    },
    series: [
      {
        type: "scatter",
        data: chartData.map((d) => [d.x, d.y, new Date(d.date).getTime()]),
      },
    ],
  };

  if (!chartData) return null;

  return (
    <div className="h-[400px] w-full">
      <BaseGraph options={chartOptions} />
    </div>
  );
};
