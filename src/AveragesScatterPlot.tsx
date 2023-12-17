import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useContext, useMemo, useState } from "react";
import { PlainObject, Vega, VisualizationSpec } from "react-vega";
import { Label } from "./Label";
import { StyledListbox } from "./Listbox";
import { GolfSwingData, SessionContext } from "./SessionContext";
import { getAllDataFromSession } from "./getAllDataFromSession";
import {
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "./types/GolfSwingData";

export const AveragesScatterPlot = () => {
  const { sessions } = useContext(SessionContext);

  const [xField, setXField] = useState("Carry-Distanz");
  const [yField, setYField] = useState("Smash Factor");

  const fields = useMemo(() => {
    if (sessions) {
      return Object.keys(sessions[Object.keys(sessions)[0]].results[0]);
    }
    return [];
  }, [sessions]);

  // create the spec for the scatter plot
  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { name: "table" },
    mark: "point",
    encoding: {
      x: {
        axis: {
          labelExpr: golfSwingDataKeysInMeters.includes(
            xField as keyof GolfSwingData,
          )
            ? "datum.value + ' m'"
            : golfSwingDataKeysInDegrees.includes(xField as keyof GolfSwingData)
              ? "datum.value + ' °'"
              : "datum.value",
        },
        field: "x",
        title: xField,
        type: "quantitative",
      },
      y: {
        axis: {
          labelExpr: golfSwingDataKeysInMeters.includes(
            yField as keyof GolfSwingData,
          )
            ? "datum.value + ' m'"
            : golfSwingDataKeysInDegrees.includes(yField as keyof GolfSwingData)
              ? "datum.value + ' °'"
              : "datum.value",
        },
        field: "y",
        title: yField,
        type: "quantitative",
      },
    },
  };
  const averages: PlainObject = useMemo(() => {
    if (sessions) {
      return {
        table: getAllDataFromSession(sessions).map((row) => ({
          x: row[xField as keyof GolfSwingData],
          y: row[yField as keyof GolfSwingData],
        })),
      };
    }
    return { table: [] };
  }, [sessions, xField, yField]);
  return (
    <Disclosure defaultOpen={true} as="div" className="mt-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500/75">
            <h3 className="text-xl font-bold">Visualization</h3>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-sky-500 self-center`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="pt-4 text-sm text-gray-500 mb-6">
            <div className="h-auto flex flex-col overflow-hidden gap-3">
              <div className="ml-4">
                <Label>Choose the fields to display</Label>
                <div className="flex flex-row gap-4">
                  <StyledListbox
                    options={fields}
                    setOption={setXField}
                    selected={xField}
                  />
                  <StyledListbox
                    options={fields}
                    setOption={setYField}
                    selected={yField}
                  />
                </div>
              </div>
              <Vega height={300} width={800} spec={spec} data={averages} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
