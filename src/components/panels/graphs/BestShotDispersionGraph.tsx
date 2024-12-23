import { useBestShots } from "../../../utils/calculateAverages";
import { BaseGraph } from "../../base/BaseGraph";
import { chartOptionsGrid, PointWithClub } from "../../base/chartOptions";

// different colors for each club
const colors = {
  1: "#FF0000",
  2: "#FFA500",
  3: "#FFFF00",
  4: "#008000",
  5: "#0000FF",
  6: "#4B0082",
  7: "#EE82EE",
  8: "#A9A9A9",
  9: "#000000",
  10: "#FF4500",
  11: "#FFD700",
  12: "#ADFF2F",
  13: "#00FFFF",
  14: "#000080",
};

export const BestShotDispersionGraph = () => {
  const { dispersion, bestShots } = useBestShots();
  const shots = bestShots.map((shot) => ({
    x:
      (shot["Carry Deviation Distance"] || shot["Gesamtabweichungsdistanz"]) ??
      0,
    y: (shot["Carry Distance"] || shot["Carry-Distanz"]) ?? 0,
    club: shot["Schlägerart"] || shot["Club Type"],
  }));

  const shotsByClub: Record<string, PointWithClub[]> = shots.reduce(
    (acc, shot) => {
      const { club } = shot;
      if (!acc[club]) {
        acc[club] = [];
      }
      acc[club].push(shot);
      return acc;
    },
    {} as Record<string, typeof shots>,
  );

  let maximumDeviation = Math.max(
    ...shots.map((shot) => Math.abs(Number(shot.x))),
  );
  // Round up to the nearest 10
  maximumDeviation = Math.ceil(maximumDeviation / 10) * 10;

  const series = Object.entries(shotsByClub)
    .map(([club, clubShots]) => {
      const clubDispersion = dispersion.find((d) => d.club === club);
      const centerX =
        clubShots.reduce((sum, shot) => sum + shot.x, 0) / clubShots.length;
      const centerY =
        clubShots.reduce((sum, shot) => sum + shot.y, 0) / clubShots.length;

      const color =
        colors[
          (Object.values(shotsByClub).findIndex(
            (shots) => shots === clubShots,
          ) + 1) as keyof typeof colors
        ];

      return [
        {
          color,
          name: club,
          type: "scatter" as const,
          data: clubShots.map((shot) => ({
            value: [shot.x, shot.y],
            club: shot.club,
          })),
          symbolSize: 8,
        },
        {
          color,
          name: `${club} Dispersion`,
          type: "line" as const,
          smooth: true,
          symbol: "none",
          data: calculateEllipsePoints(
            [centerX, centerY],
            clubDispersion?.ellipse.xAxis || 0,
            clubDispersion?.ellipse.yAxis || 0,
          ),
          lineStyle: {
            opacity: 0.5,
            width: 1,
          },
        },
      ];
    })
    .flat();

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
    series,
  };

  return (
    <div className="h-[400px] w-full">
      <BaseGraph options={options} />
    </div>
  );
};

const calculateEllipsePoints = (
  center: [number, number],
  xAxis: number,
  yAxis: number,
): number[][] => {
  const points: number[][] = [];
  for (let angle = 0; angle <= 360; angle += 5) {
    const radian = (angle * Math.PI) / 180;
    const x = center[0] + xAxis * Math.cos(radian);
    const y = center[1] + yAxis * Math.sin(radian);
    points.push([x, y]);
  }
  return points;
};
