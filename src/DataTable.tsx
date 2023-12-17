import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { AveragedSwing } from "./calculateAverages";
import { getAllDataFromSession } from "./getAllDataFromSession";

export const DataTable = () => {
  const { sessions } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] = useState<ColDef<AveragedSwing>[]>([]);

  useEffect(() => {
    if (sessions && Object.keys(sessions)?.length > 0) {
      const columns = Object.keys(
        sessions[Object.keys(sessions)[0]]?.results?.[0],
      ).map((key) => ({
        field: key,
        headerName: key,
        sortable: true,
        filter: true,
      }));
      setColumnDefs(columns as ColDef<AveragedSwing>[]);
    }
  }, [sessions]);

  // Get the session where selected is true
  const jsonFileWithoutEmptyRows = sessions
    ? getAllDataFromSession(sessions)
    : [];

  return (
    <div>
      {jsonFileWithoutEmptyRows ? (
        <Disclosure defaultOpen={true} as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500/75">
                <h3 className="text-xl font-bold">All Data</h3>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-sky-500 self-center`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 text-sm text-gray-500 mb-6">
                <div className="ag-theme-quartz" style={{ height: 500 }}>
                  <AgGridReact
                    rowData={jsonFileWithoutEmptyRows}
                    columnDefs={columnDefs}
                  />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : (
        <p className="text-md text-sky-900">
          Select a session to display data here.
        </p>
      )}
    </div>
  );
};
