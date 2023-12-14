import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react";
import { useContext, useState } from "react";
import { SessionContext } from "./SessionContext";

export const DataTable = () => {
  const { sessions } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs] = useState([
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
  ]);

  // Get the session where selected is true
  const jsonFileWithoutEmptyRows =
    sessions &&
    Object.values(sessions)
      .filter((session) => session.selected)
      ?.reduce(
        (acc, curr) => {
          if (curr.results.length > 0) {
            acc.push(...curr.results);
          }
          return acc;
        },
        [] as Array<Record<string, string>>,
      );

  return (
    <>
      <h3 className="text-xl font-bold">Data</h3>
      {jsonFileWithoutEmptyRows ? (
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={jsonFileWithoutEmptyRows}
            columnDefs={columnDefs}
          />
        </div>
      ) : (
        <p className="text-md text-sky-900">
          Select a session to display data here.
        </p>
      )}
    </>
  );
};
