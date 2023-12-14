import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { AgGridReact } from "ag-grid-react";
import { useContext } from "react";
import { Label } from "./Label";
import { SessionContext } from "./SessionContext";

export const AveragesTable = () => {
  const { sessions } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const columnDefs = [
    { field: "Schlägerart" },
    { field: "Carry-Distanz" },
    { field: "Abflugrichtung" },
    { field: "Backspin" },
    { field: "Ballgeschwindigkeit" },
    { field: "Carry-Abweichungsdistanz" },
    { field: "Carry-Abweichungswinkel" },
    { field: "Abflugwinkel" },
    { field: "Anstellwinkel" },
    { field: "Sidespin" },
    { field: "Gesamtabweichungsdistanz" },
    { field: "Gesamtabweichungswinkel" },
    { field: "Gesamtstrecke" },
  ];

  // Calculate averages for each column on all sessions
  const dataAverages = columnDefs.map((columnDef) => {
    if (sessions) {
      const { field } = columnDef;
      const values = Object.values(sessions).map((session) => {
        return session?.results.map(
          (result: { [x: string]: string }) => result[field],
        );
      });
      const average =
        values.flat().reduce((a, b) => a + b, 0) / values.flat().length;
      return { [field]: average };
    }
  });

  return sessions ? (
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
          <Disclosure.Panel className="mt-2 pt-4 text-sm text-gray-500">
            <div className="ag-theme-quartz" style={{ height: 500 }}>
              <Label className="px-4">
                Averages for all sessions selected in the Session Picker.
              </Label>
              <AgGridReact rowData={dataAverages} columnDefs={columnDefs} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ) : (
    <p className="text-md text-sky-900">
      Select a session to display data here.
    </p>
  );
};
