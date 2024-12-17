import dayjs from "dayjs";
import * as echarts from "echarts";
import { GolfSwingData } from "../../types/GolfSwingData";
import { BaseGraph } from "../base/BaseGraph";
import {
  chartOptionsGrid,
  golfSwingDataAxisFormatter,
} from "../base/chartOptions";
import { ClubDataForTable } from "./AveragesPerSession";

/**
 * Custom echarts mount to make the graph rerender on nested data change,
 * which somehow does not work when using the echarts-for-react package.
 * It does in other graphs though, weird!
 */
export const AveragesPerSessionGraph = ({
  metric,
  data,
}: {
  metric: keyof GolfSwingData;
  data: ClubDataForTable;
}) => {
  const hasClubData = data.length && "club" in data[0];
  const seriesData: echarts.SeriesOption[] = hasClubData
    ? Array.from(new Set(data.map((d) => d.club))).map((club) => ({
        name: club,
        type: "line",
        data: data
          .filter((d) => d.club === club && !!d.x)
          .map((d) => {
            return {
              value: [new Date(d.x!), d.y],
              club: d.club,
            };
          }),
      }))
    : [];

  const options: echarts.EChartsOption = {
    grid: { ...chartOptionsGrid, bottom: "25%" },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const p = params[0];
        return [
          `Date: ${dayjs(p.value[0]).format("MMM DD YYYY")}`,
          `${metric}: ${p.value[1].toFixed(2)}`,
          hasClubData ? `Club: ${p.data.club}` : "",
        ]
          .filter(Boolean)
          .join("<br/>");
      },
    },
    xAxis: {
      type: "time",
      axisLabel: {
        formatter: (value: number) => dayjs(value).format("MMM DD"),
      },
    },
    yAxis: {
      type: "value",
      name: metric,
      axisLabel: {
        formatter: golfSwingDataAxisFormatter(metric as keyof GolfSwingData),
      },
    },
    series: seriesData,
    legend: {
      show: !!hasClubData,
      orient: "horizontal",
      top: "75%",
    },
  };

  return <BaseGraph options={options} />;
};
