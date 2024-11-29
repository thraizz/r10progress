import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useContext, useMemo } from "react";
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

  const columnDefs: ColDef<AveragedSwing>[] = useMemo(() => {
    if (averages?.length > 0) {
      return getColumnDefinitions(averages);
    }
    return defaultColumns;
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

/**
 * Get the columns for the table based on the first swing
 * @param averageSwings - An array of averaged swings
 * @returns The column definitions.
 */
const getColumnDefinitions = (averageSwings: AveragedSwing[]) => {
  const averageSwing = averageSwings[0];
  return Object.keys(averageSwing)
    .sort(sortGolfSwingKeysForHeader)
    .map((key) => ({
      field: key as keyof AveragedSwing,
      headerName: ["count", "name"].includes(key)
        ? capitalizeFirstLetter(key)
        : translateHeader(key),
      sortable: true,
      filter: true,
    }));
};
