import { VegaLite, VisualizationSpec } from "react-vega";
import {
  GolfSwingData,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../../types/GolfSwingData";

export type YFieldValue = string | number | null | undefined;
export type ClubDataForTable =
  | {
      x: string | null | undefined;
      y: YFieldValue;
    }[]
  | {
      x: string | null | undefined;
      y: YFieldValue;
      club: string;
    }[];

export const AveragesPerSessionGraph = ({
  yField,
  data,
}: {
  yField: keyof GolfSwingData;
  data: ClubDataForTable;
}) => {
  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { name: "table" },
    width: "container",
    height: "container",
    mark: "point",
    encoding: {
      x: {
        axis: {
          labelAngle: 0,
        },
        field: "x",
        title: "Date",
        type: "temporal",
        sort: "ascending",
      },
      y: {
        axis: {
          labelExpr: golfSwingDataKeysInMeters.includes(yField)
            ? "datum.value + ' m'"
            : golfSwingDataKeysInDegrees.includes(yField)
              ? "datum.value + ' °'"
              : "datum.value",
        },
        field: "y",
        title: yField,
        type: "quantitative",
      },
    },
  };
  if (data.length && "club" in data[0]) {
    spec.encoding!.color = {
      field: "club",
      type: "nominal",
      title: "Club",
    };
  }

  const specForMobile: VisualizationSpec = {
    ...spec,
    // Don't show action buttons on mobile
    config: {
      view: { stroke: "transparent" },
      legend: {
        orient: "bottom",
      },
    },
  };

  return (
    <div className="block h-[400px] w-full">
      <div className="hidden h-[400px] w-full lg:block">
        <VegaLite spec={spec} data={{ table: data }} />
      </div>
      <div className="h-[400px] w-full lg:hidden">
        <VegaLite spec={specForMobile} data={{ table: data }} />
      </div>
    </div>
  );
};
