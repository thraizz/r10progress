import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../provider/SessionContext";
import {
  AveragedSwing,
  useAveragedSwings,
} from "../../utils/calculateAverages";
import { translateHeader } from "../../utils/csvLocalization";
import { sortGolfSwingKeysForHeader } from "../../utils/utils";
import { BaseDisclosure } from "../base/BaseDisclosure";
import { BaseLabel } from "../base/BaseLabel";
const defaultColumns: ColDef<AveragedSwing>[] = [
  { field: "name", headerName: "Club", sortable: true, filter: true },
  { field: "count", headerName: "Count", sortable: true, filter: true },
];
const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const AveragesTable = () => {
  const { sessions } = useContext(SessionContext);

  const averages = useAveragedSwings();

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
            : translateHeader(key),
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
    <BaseDisclosure title="Average Values">
      <div
        className="ag-theme-quartz"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <BaseLabel className="py-2">
          Averages for all sessions selected in the Session Picker.
        </BaseLabel>
        <div style={{ height: 500 }}>
          <AgGridReact rowData={averages} columnDefs={columnDefs} />
        </div>
      </div>
    </BaseDisclosure>
  );
};
