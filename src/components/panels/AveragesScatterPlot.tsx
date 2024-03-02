import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useContext, useMemo, useState } from "react";
import { PlainObject, Vega, VisualizationSpec } from "react-vega";
import { SessionContext } from "../../provider/SessionContext";
import {
  GolfSwingData,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../../types/GolfSwingData";
import { Sessions } from "../../types/Sessions";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";
import { translateToEnglish } from "../../utils/csvLocalization";

export const AveragesScatterPlot = () => {
  const { sessions } = useContext(SessionContext);

  const [xField, setXField] = useState("Backspin");
  const [yField, setYField] = useState("Smash Factor");

  const fields = useMemo(() => {
    if (sessions) {
      return Object.keys(sessions).length > 0
        ? Object.keys(sessions[Object.keys(sessions)[0]]?.results?.[0])
        : [];
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

  const clubs: {
    [key: string]: GolfSwingData[];
  } = useMemo(() => {
    if (sessions) {
      return transformSessions(sessions);
    }
    return {};
  }, [sessions]);

  function transformSessions(sessions: Sessions): {
    [key: string]: GolfSwingData[];
  } {
    const resultsByClub: { [key: string]: GolfSwingData[] } = {};

    Object.values(sessions).forEach((session) => {
      translateToEnglish(session.results).forEach((result) => {
        const club = result.Schlägerart || result["Club Type"];
        if (club) {
          if (!resultsByClub[club]) {
            resultsByClub[club] = [];
          }
          resultsByClub[club].push(result);
        }
      });
    });

    return resultsByClub;
  }

  const [club, setClub] = useState<string | null>(null);

  const averages: PlainObject = useMemo(() => {
    if (sessions) {
      if (club && club !== "All" && clubs[club]) {
        return {
          table: clubs[club].map((row) => ({
            x: row[xField as keyof GolfSwingData],
            y: row[yField as keyof GolfSwingData],
          })),
        };
      }
      return {
        table: getAllDataFromSession(sessions).map((row) => ({
          x: row[xField as keyof GolfSwingData],
          y: row[yField as keyof GolfSwingData],
        })),
      };
    }
    return { table: [] };
  }, [sessions, xField, yField, clubs, club]);

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
            <div className="h-auto flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-2 mb-6">
                <div>
                  <BaseLabel>Choose the fields to display</BaseLabel>
                  <div className="flex flex-col md:flex-row gap-4">
                    <BaseListbox
                      options={fields}
                      setOption={setXField}
                      value={xField}
                      valueText={xField as string}
                    />
                    <BaseListbox
                      options={fields}
                      setOption={setYField}
                      value={yField}
                      valueText={yField as string}
                    />
                  </div>
                </div>
                <div className="border-l-2 border-gray-300 h-auto  w-0"></div>
                <div>
                  <BaseLabel>Choose the club to display</BaseLabel>
                  <div className="flex flex-row gap-4">
                    <BaseListbox
                      options={[
                        ...Object.keys(clubs).filter(
                          (v) =>
                            v !== undefined ||
                            v !== null ||
                            v !== "" ||
                            v !== "undefined",
                        ),
                        "All",
                      ]}
                      setOption={setClub}
                      value={club || ""}
                      valueText={club || "All"}
                    />
                  </div>
                </div>
              </div>
              <div className="block lg:hidden">
                <Vega width={700} height={700} spec={spec} data={averages} />
              </div>
              <div className="hidden lg:block">
                <Vega width={1500} height={700} spec={spec} data={averages} />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
