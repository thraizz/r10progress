import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useContext } from "react";
import { Label } from "./Label";
import { SessionContext } from "./SessionContext";
import { AveragedSwing, calculateAverages } from "./calculateAverages";

export const AveragesTable = () => {
  const { sessions } = useContext(SessionContext);

  // {
  //     "Abflugrichtung": 1.926966573132409,
  //     "Abflugwinkel": 15.135783533917532,
  //     "Anstellwinkel": -1.1857004306382604,
  //     "Backspin": 4621.155019802517,
  //     "Ballgeschwindigkeit": 134.76729867597945,
  //     "Carry-Abweichungsdistanz": -0.16316428648100958,
  //     "Carry-Abweichungswinkel": 1.0715296745300293,
  //     "Carry-Distanz": 82.54763145446778,
  //     "Drehachse": -2.0749586704704495,
  //     "Drehrate": 4693.218630642361,
  //     "Gesamtabweichungsdistanz": 0.2135619772805108,
  //     "Gesamtabweichungswinkel": 0.9892588668399387,
  //     "Gesamtstrecke": 97.3018485599094,
  //     "Höhe des Scheitelpunkts": 10.057312718696064,
  //     "Luftdichte": 1.2390065688888887,
  //     "Luftdruck": 100.30643711111111,
  //     "Relative Luftfeuchtigkeit": 81.57777777777778,
  //     "Schl.gsch.": 117.50878274523454,
  //     "Schlagfläche": 1.2794463779156406,
  //     "Schlagflächenstellung": 1.850954035255644,
  //     "Schwungbahn": 0.18552126677499878,
  //     "Sidespin": 227.9454793718126,
  //     "Smash Factor": 1.146739124703454,
  //     "Temperatur": 7.962963055555558,
  //     "count": 45,
  //     "name": "Eisen 7",
  //   }
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

  if (!sessions) {
    return (
      <p className="text-md text-sky-900">
        Select a session to display data here.
      </p>
    );
  }

  const averages = calculateAverages(sessions);
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
            <div className="ag-theme-quartz" style={{ height: 500 }}>
              <Label className="px-4">
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
