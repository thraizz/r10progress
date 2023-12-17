import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useContext, useMemo } from "react";
import { Label } from "./Label";
import { SessionContext } from "./SessionContext";
import { AveragedSwing, calculateAverages } from "./calculateAverages";

export const AveragesTable = () => {
  const { sessions } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const columnDefs: ColDef<AveragedSwing>[] = [
    { field: "name", headerName: "Club", sortable: true, filter: true },
    { field: "count", headerName: "Count", sortable: true, filter: true },
    {
      field: "Ballgeschwindigkeit",
      headerName: "Ball Speed",
      sortable: true,
      filter: true,
    },
    {
      field: "Carry-Distanz",
      headerName: "Carry Distance",
      sortable: true,
      filter: true,
    },
    {
      field: "Carry-Abweichungsdistanz",
      headerName: "Carry Distance Deviation",
      sortable: true,
      filter: true,
    },
    {
      field: "Carry-Abweichungswinkel",
      headerName: "Carry Angle Deviation",
      sortable: true,
      filter: true,
    },
    {
      field: "Gesamtstrecke",
      headerName: "Total Distance",
      sortable: true,
      filter: true,
    },
    {
      field: "Gesamtabweichungsdistanz",
      headerName: "Total Distance Deviation",
      sortable: true,
      filter: true,
    },
    {
      field: "Gesamtabweichungswinkel",
      headerName: "Total Angle Deviation",
      sortable: true,
      filter: true,
    },
    {
      field: "Abflugrichtung",
      headerName: "Launch Direction",
      sortable: true,
      filter: true,
    },
    {
      field: "Abflugwinkel",
      headerName: "Launch Angle",
      sortable: true,
      filter: true,
    },
    {
      field: "Anstellwinkel",
      headerName: "Attack Angle",
      sortable: true,
      filter: true,
    },
    { field: "Backspin", headerName: "Backspin", sortable: true, filter: true },
    {
      field: "Drehachse",
      headerName: "Spin Axis",
      sortable: true,
      filter: true,
    },
    {
      field: "Drehrate",
      headerName: "Spin Rate",
      sortable: true,
      filter: true,
    },
    {
      field: "Höhe des Scheitelpunkts",
      headerName: "Apex Height",
      sortable: true,
      filter: true,
    },
    {
      field: "Luftdichte",
      headerName: "Air Density",
      sortable: true,
      filter: true,
    },
    {
      field: "Luftdruck",
      headerName: "Air Pressure",
      sortable: true,
      filter: true,
    },
    {
      field: "Relative Luftfeuchtigkeit",
      headerName: "Humidity",
      sortable: true,
      filter: true,
    },
    {
      field: "Schlagfläche",
      headerName: "Face Angle",
      sortable: true,
      filter: true,
    },
    {
      field: "Schlagflächenstellung",
      headerName: "Face to Path",
      sortable: true,
      filter: true,
    },
    {
      field: "Schwungbahn",
      headerName: "Swing Path",
      sortable: true,
      filter: true,
    },
    { field: "Sidespin", headerName: "Sidespin", sortable: true, filter: true },
    {
      field: "Smash Factor",
      headerName: "Smash Factor",
      sortable: true,
      filter: true,
    },
    {
      field: "Temperatur",
      headerName: "Temperature",
      sortable: true,
      filter: true,
    },
  ];

  const averages = useMemo(() => {
    if (sessions) {
      return calculateAverages(sessions);
    }
  }, [sessions]);
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
          <Disclosure.Panel className="mt-2 pt-4 text-sm text-gray-500">
            <div
              className="ag-theme-quartz"
              style={{ height: "100%", display: "flex" }}
            >
              <Label className="py-4">
                Averages for all sessions selected in the Session Picker.
              </Label>
              <AgGridReact rowData={averages} columnDefs={columnDefs} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
