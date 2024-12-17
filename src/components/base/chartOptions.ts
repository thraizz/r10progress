export const chartOptionsGrid = {
  left: 5,
  right: 5,
  top: 5,
  bottom: 5,
  containLabel: true,
};

export const chartOptionsDateTooltip = (xField: string, yField: string) => ({
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
export const chartOptionsVisualRecencyMap = (chartData: any[]) => [
  {
    type: "continuous",
    show: false,
    inRange: {
      color: ["lightgrey", "rgb(12, 121, 188)"],
    },
    dimension: 2, // Map colors based on the `date` field (index 2 in the data array)
    min: Math.min(...chartData.map((d) => new Date(d.date).getTime())),
    max: Math.max(...chartData.map((d) => new Date(d.date).getTime())),
  },
];
