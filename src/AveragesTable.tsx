import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { Label } from "./Label";
import { SessionContext } from "./SessionContext";
import { AveragedSwing, calculateAverages } from "./calculateAverages";
import { sortGolfSwingKeysForHeader } from "./utils";
const defaultColumns: ColDef<AveragedSwing>[] = [
  { field: "name", headerName: "Club", sortable: true, filter: true },
  { field: "count", headerName: "Count", sortable: true, filter: true },
];
const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const AveragesTable = () => {
  const { sessions } = useContext(SessionContext);

  const averages = useMemo(() => {
    if (sessions) {
      return calculateAverages(sessions);
    }
  }, [sessions]);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] =
    useState<ColDef<AveragedSwing>[]>(defaultColumns);

  useEffect(() => {
    if (averages && averages?.length > 0) {
      const columns = Object.keys(averages[0])
        .sort(sortGolfSwingKeysForHeader)
        .map((key) => ({
          field: key,
          headerName: ["count", "name"].includes(key)
            ? capitalizeFirstLetter(key)
            : key,
          sortable: true,
          filter: true,
        }));
      setColumnDefs(columns as ColDef<AveragedSwing>[]);
    }
  }, [averages]);

  if (!sessions) {
    return (
      <p className="text-md text-sky-900">
        Select a session to display data here.
      </p>
    );
  }

  return (
    <Disclosure defaultOpen={true} as="div" className="mt-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500/75">
            <h3 className="text-xl font-bold">Average Values</h3>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-sky-500 self-center`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="pt-4 text-sm text-gray-500 mb-6">
            <div
              className="ag-theme-quartz"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Label className="py-2 ml-4">
                Averages for all sessions selected in the Session Picker.
              </Label>
              <div style={{ height: 500 }}>
                <AgGridReact rowData={averages} columnDefs={columnDefs} />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
