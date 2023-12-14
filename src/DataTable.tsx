import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useContext } from "react";
import { GolfSwingData, SessionContext } from "./SessionContext";

export const DataTable = () => {
  const { sessions } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const columnDefs: ColDef<GolfSwingData>[] = [
    { field: "Spieler" },
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
    // { field: "Datum" },
    // { field: "Drehachse" },
    // { field: "Drehrate" },
    // { field: "Drehratentyp" },
    { field: "Gesamtabweichungsdistanz" },
    { field: "Gesamtabweichungswinkel" },
    { field: "Gesamtstrecke" },
    // { field: "Höhe des Scheitelpunkts" },
    // { field: "Luftdichte" },
    // { field: "Luftdruck" },
    // { field: "Markierung" },
    // { field: "Notiz" },
    // { field: "Relative Luftfeuchtigkeit" },
    // { field: "Schl.gsch." },
    // { field: "Schlagfläche" },
    // { field: "Schlagflächenstellung" },
    // { field: "Schlägername" },
    // { field: "Schwungbahn" },
    // { field: "Smash Factor" },
    // { field: "Temperatur" },
  ];

  // Get the session where selected is true
  const jsonFileWithoutEmptyRows = sessions
    ? Object.values(sessions)
        .filter((session) => session.selected)
        ?.reduce((acc, curr) => {
          if (curr.results.length > 0) {
            acc.push(...curr.results);
          }
          return acc;
        }, [] as GolfSwingData[])
    : [];

  return (
    <div>
      {jsonFileWithoutEmptyRows ? (
        <Disclosure defaultOpen={false} as="div" className="mt-2">
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
              <Disclosure.Panel className="mt-2 pt-4 text-sm text-gray-500">
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
