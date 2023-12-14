import { AgGridReact } from "ag-grid-react";
import { useContext } from "react";
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
        return session.results.map((result) => result[field]);
      });
      const average =
        values.flat().reduce((a, b) => a + b, 0) / values.flat().length;
      return { [field]: average };
    }
  });

  return sessions ? (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <h2 className="text-2xl font-bold">Averages</h2>
      <p className="text-md">
        Averages for all sessions selected in the Session Picker.
      </p>
      <AgGridReact rowData={dataAverages} columnDefs={columnDefs} />
    </div>
  ) : (
    <p className="text-md text-sky-900">
      Select a session to display data here.
    </p>
  );
};
