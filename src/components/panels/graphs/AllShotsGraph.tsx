import * as echarts from "echarts";
import { BaseGraph } from "../../base/BaseGraph";
import { chartOptionsGrid } from "../../base/chartOptions";
import { useCarryAndDeviation } from "./ShotDispersionGraph.utils";

export const AllShotsGraph = () => {
  const shots = useCarryAndDeviation();

  let maximumDeviation = Math.max(
    ...shots.shots.map((shot) => Math.abs(Number(shot.x))),
  );
  // Round up to the nearest 10
  maximumDeviation = Math.ceil(maximumDeviation / 10) * 10;

  const options: echarts.EChartsOption = {
    grid: { ...chartOptionsGrid, bottom: "25%" },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        return [
          `Deviation: ${params.value[0].toFixed(2)}m`,
          `Carry: ${params.value[1].toFixed(2)}m`,
          `Club: ${params.data.club}`,
        ].join("<br/>");
      },
    },
    xAxis: {
      type: "value",
      name: "Deviation",
      min: -maximumDeviation,
      max: maximumDeviation,
    },
    yAxis: {
      type: "value",
      name: "Carry",
    },
    legend: {
      orient: "horizontal",
      top: "75%",
    },
    series: Object.entries(shots.shotsByClub).map(([club, shots]) => ({
      type: "scatter",
      name: club,
      data: shots.map((shot) => ({
        value: [shot.x, shot.y],
        club,
      })),
    })),
  };

  return (
    <div className="h-[400px] w-full">
      <BaseGraph options={options} />
    </div>
  );
};
