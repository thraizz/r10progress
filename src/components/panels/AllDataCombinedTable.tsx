import { TrashIcon } from "@heroicons/react/24/outline";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SessionContext } from "../../provider/SessionContext";
import { GolfSwingData } from "../../types/GolfSwingData";
import { translateHeader } from "../../utils/csvLocalization";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { sortGolfSwingKeysForHeader } from "../../utils/utils";
import { BaseContextMenu } from "../base/BaseContextMenu";
import { BaseDialog } from "../base/BaseDialog";
import { BaseDisclosure } from "../base/BaseDisclosure";

export const AllDataCombinedTable = () => {
  const { sessions, deleteRowFromSession } = useContext(SessionContext);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] = useState<ColDef<GolfSwingData>[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Consolidated state for deletion
  const [deleteAction, setDeleteAction] = useState<{
    row: GolfSwingData | null;
    sessionId: string | null;
    showDialog: boolean;
  }>({
    row: null,
    sessionId: null,
    showDialog: false,
  });

  // State for context menu
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Memoize the grid data to prevent unnecessary recalculations
  const jsonFileWithoutEmptyRows = useMemo(
    () => (sessions ? getAllDataFromSession(sessions) : []),
    [sessions],
  );

  // Find the sessionId for a given row - optimized version
  const findSessionIdForRow = useCallback(
    (row: GolfSwingData): string | null => {
      // Using a for...in loop for better performance than Object.entries
      for (const sessionId in sessions) {
        const session = sessions[sessionId];
        if (!session.selected) continue;

        // Using simple equality check first for common cases
        const rowIndex = session.results.findIndex((r) => {
          // Check a few key properties that are likely different between rows
          // Use safe property access with any type to avoid TypeScript errors
          if ((r as any)["Club"] !== (row as any)["Club"]) return false;
          if ((r as any)["Ball Speed"] !== (row as any)["Ball Speed"])
            return false;

          // Only do the expensive JSON comparison if the quick checks pass
          return JSON.stringify(r) === JSON.stringify(row);
        });

        if (rowIndex !== -1) return sessionId;
      }
      return null;
    },
    [sessions],
  );

  // Initialize columns
  useEffect(() => {
    if (sessions && Object.keys(sessions)?.length > 0) {
      const columns = Object.keys(getAllDataFromSession(sessions)[0] || {})
        .sort(sortGolfSwingKeysForHeader)
        .map((key) => ({
          field: key,
          headerName: translateHeader(key),
          sortable: true,
          filter: true,
        }));
      const filteredColumns = columns.filter(
        (column) => column.field !== "Schl.gsch.",
      ) as ColDef<GolfSwingData>[];

      // Add Actions column (no 'field' property to avoid type error)
      filteredColumns.push({
        headerName: "Actions",
        cellRenderer: (params: any) => {
          return (
            <button
              title="Delete Shot"
              onClick={() => handleDeleteClick(params.data)}
              disabled={isDeleting}
              style={{
                background: "none",
                border: "none",
                cursor: isDeleting ? "default" : "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                color: isDeleting ? "#9ca3af" : "#dc2626", // Gray when disabled
                height: "100%",
              }}
            >
              <TrashIcon width={18} height={18} />
            </button>
          );
        },
        width: 70,
        pinned: false,
        sortable: false,
        filter: false,
      } as any);
      setColumnDefs(filteredColumns);
    }
  }, [sessions, isDeleting]);

  // Handler for delete button click
  const handleDeleteClick = useCallback(
    (row: GolfSwingData) => {
      const sessionId = findSessionIdForRow(row);
      setDeleteAction({
        row,
        sessionId,
        showDialog: true,
      });
    },
    [findSessionIdForRow],
  );

  // Custom context menu logic
  const handleCellContextMenu = useCallback(
    (params: any) => {
      params.event.preventDefault();
      setContextMenu({
        x: params.event.clientX,
        y: params.event.clientY,
      });
      setDeleteAction((prev) => ({
        ...prev,
        row: params.data,
        sessionId: findSessionIdForRow(params.data),
      }));
    },
    [findSessionIdForRow],
  );

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleDeleteFromContextMenu = useCallback(() => {
    setDeleteAction((prev) => ({
      ...prev,
      showDialog: true,
    }));
    handleContextMenuClose();
  }, [handleContextMenuClose]);

  const handleDialogClose = useCallback(() => {
    setDeleteAction({
      row: null,
      sessionId: null,
      showDialog: false,
    });
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    const { row, sessionId } = deleteAction;
    if (row && sessionId) {
      setIsDeleting(true);
      try {
        await deleteRowFromSession(sessionId, row);
      } finally {
        setIsDeleting(false);
      }
    }
    handleDialogClose();
  }, [deleteAction, deleteRowFromSession, handleDialogClose]);

  return jsonFileWithoutEmptyRows?.length > 0 ? (
    <BaseDisclosure title="All Data">
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <AgGridReact
          rowData={jsonFileWithoutEmptyRows}
          columnDefs={columnDefs}
          onCellContextMenu={handleCellContextMenu}
        />
      </div>
      <BaseContextMenu
        open={!!contextMenu}
        position={contextMenu}
        onClose={handleContextMenuClose}
        items={[
          {
            label: isDeleting ? "Deleting..." : "Delete Shot",
            onClick: handleDeleteFromContextMenu,
            icon: <TrashIcon width={18} height={18} />,
            danger: true,
            disabled: isDeleting,
          },
        ]}
      />
      <BaseDialog
        open={deleteAction.showDialog}
        onClose={handleDialogClose}
        title="Delete Shot?"
        buttonText="Cancel"
      >
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to delete this shot? This action cannot be
            undone.
          </p>
          <button
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-300"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </BaseDialog>
    </BaseDisclosure>
  ) : (
    <p className="text-md text-sky-900">
      No files uploaded yet. Please upload a file first.
    </p>
  );
};
