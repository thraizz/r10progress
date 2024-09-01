import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../provider/SessionContext";
import { GolfSwingData } from "../../types/GolfSwingData";
import { translateHeader } from "../../utils/csvLocalization";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { sortGolfSwingKeysForHeader } from "../../utils/utils";
import { BaseDisclosure } from "../base/BaseDisclosure";

export const AllDataCombinedTable = () => {
  const { sessions } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] = useState<ColDef<GolfSwingData>[]>([]);

  useEffect(() => {
    if (sessions && Object.keys(sessions)?.length > 0) {
      const columns = Object.keys(
        sessions[Object.keys(sessions)[0]]?.results?.[0],
      )
        .sort(sortGolfSwingKeysForHeader)
        .map((key) => ({
          field: key,
          headerName: translateHeader(key),
          sortable: true,
          filter: true,
        }));
      setColumnDefs(
        columns.filter(
          (column) => column.field !== "Schl.gsch.",
        ) as ColDef<GolfSwingData>[],
      );
    }
  }, [sessions]);

  // Get the session where selected is true
  const jsonFileWithoutEmptyRows = sessions
    ? getAllDataFromSession(sessions)
    : [];

  return jsonFileWithoutEmptyRows ? (
    <BaseDisclosure title="All Data">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={jsonFileWithoutEmptyRows}
          columnDefs={columnDefs}
        />
      </div>
    </BaseDisclosure>
  ) : (
    <p className="text-md text-sky-900">
      Select a session to display data here.
    </p>
  );
};
