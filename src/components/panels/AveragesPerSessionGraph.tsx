import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import {
  GolfSwingData,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../../types/GolfSwingData";
import { chartOptionsGrid } from "../base/chartOptions";
import { ClubDataForTable } from "./AveragesPerSession";
customParseFormat;

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
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    // Initialize chart
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // Cleanup
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;

    const hasClubData = data.length && "club" in data[0];
    const seriesData = hasClubData
      ? Array.from(new Set(data.map((d) => d.club))).map((club) => ({
          name: club,
          type: "line",
          data: data
            .filter((d) => d.club === club)
            .map((d) => ({
              value: [new Date(d.x), d.y],
              club: d.club,
            })),
        }))
      : [];

    const options = {
      grid: { ...chartOptionsGrid, bottom: 70 },
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
          formatter: (value: string) => dayjs(value).format("MMM DD"),
        },
      },
      yAxis: {
        type: "value",
        name: metric,
        axisLabel: {
          formatter: (value: number) =>
            golfSwingDataKeysInMeters.includes(metric)
              ? `${value} m`
              : golfSwingDataKeysInDegrees.includes(metric)
                ? `${value} °`
                : value,
        },
      },
      series: seriesData,
      legend: {
        show: hasClubData,
        orient: "horizontal",
        bottom: 0,
      },
    };

    chartInstance.current.setOption(options, true);
  }, [data, metric]);

  return <div ref={chartRef} className="h-[500px] w-full" />;
};
