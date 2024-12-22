import * as echarts from "echarts";
import {
  GolfSwingData,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../../types/GolfSwingData";

export const chartOptionsGrid = {
  left: 5,
  right: 5,
  top: 5,
  bottom: 5,
  containLabel: true,
};

/**
 * This tooltip shows both selected fiels (xField and yField) and the formatted date
 */
export const chartOptionsDateTooltip: (
  xField: string,
  yField: string,
) => echarts.TooltipComponentOption = (xField, yField) => ({
  trigger: "item",
  formatter: (params: any) =>
    `${xField}: ${params.value[0].toFixed(2)}<br/>
         ${yField}: ${params.value[1].toFixed(2)}<br/>
         Date: ${params.value[2]}`,
});

/**
 * This function returns the visual map options for the chart based on the chart data's recency.
 * @param chartData An array of chart data where the third data point is a date.
 * @returns The visual map for the chart.
 */
export const chartOptionsVisualRecencyMap = (chartData: any[]) => {
  const minNumber = Math.min(
    ...chartData.map((d) => new Date(d.date).getTime()),
  );
  const maxNumber = Math.max(
    ...chartData.map((d) => new Date(d.date).getTime()),
  );
  const data = [
    {
      type: "continuous",
      show: false,
      inRange: {
        color: ["lightgrey", "rgb(12, 121, 188)"],
      },
      dimension: 2, // Map colors based on the `date` field (index 2 in the data array)
      min: minNumber,
      max: maxNumber,
    },
  ];
  return data;
};

/**
 * This function returns a formatter that shows the unit designation for the axis labels.
 */
export const golfSwingDataAxisFormatter =
  (xField: keyof GolfSwingData) => (value: number) =>
    golfSwingDataKeysInMeters.includes(xField as keyof GolfSwingData)
      ? `${value} m`
      : golfSwingDataKeysInDegrees.includes(xField as keyof GolfSwingData)
        ? `${value} °`
        : `${value}`;

export type PointWithDate = {
  x: GolfSwingData[keyof GolfSwingData];
  y: GolfSwingData[keyof GolfSwingData];
  date: string;
};

export type PointWithClub = {
  x: GolfSwingData[keyof GolfSwingData];
  y: number;
  club: string;
};
