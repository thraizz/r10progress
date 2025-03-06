import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useCallback, useContext, useEffect, useMemo } from "react";
import { SessionContext } from "../provider/SessionContext";
import { Sessions } from "../types/Sessions";

export const SessionPicker = () => {
  const { sessions, setSessions, fetchSnapshot, initialized, isLoading } =
    useContext(SessionContext);

  // Derive selected sessions from the sessions object
  const selected = useMemo(() => {
    if (!sessions) return [];

    const selectedKeys = Object.keys(sessions).filter(
      (key) => sessions[key].selected,
    );

    // If all sessions are selected, include the "All" option
    const allSessionsSelected =
      selectedKeys.length === Object.keys(sessions).length &&
      Object.keys(sessions).length > 0;

    return allSessionsSelected ? [...selectedKeys, "All"] : selectedKeys;
  }, [sessions]);

  // Handle initial data loading
  useEffect(() => {
    if (!initialized) {
      fetchSnapshot();
    }
  }, [fetchSnapshot, initialized]);

  // Memoize session keys for performance
  const sessionKeys = useMemo(
    () => (sessions ? Object.keys(sessions) : []),
    [sessions],
  );

  // Helper function to create updated sessions with a specific selection state
  const createUpdatedSessions = useCallback(
    (selectAll: boolean, specificSelections?: string[]) => {
      if (!sessions) return {} as Sessions;

      return sessionKeys.reduce((acc, key) => {
        // If specificSelections is provided, use it to determine selection
        // Otherwise use the selectAll parameter for all sessions
        const isSelected = specificSelections
          ? specificSelections.includes(key)
          : selectAll;

        acc[key] = { ...sessions[key], selected: isSelected };
        return acc;
      }, {} as Sessions);
    },
    [sessions, sessionKeys],
  );

  // Handle selection changes with useCallback
  const handleSelectionChange = useCallback(
    (value: string[]) => {
      if (!sessions) return;

      // Check if "All" was just selected
      const allJustSelected =
        value.includes("All") && !selected.includes("All");

      // Check if "All" was just deselected
      const allJustDeselected =
        !value.includes("All") && selected.includes("All");

      let updatedSessions: Sessions;

      if (allJustSelected) {
        // Select all sessions
        updatedSessions = createUpdatedSessions(true);
      } else if (allJustDeselected) {
        // Deselect all sessions
        updatedSessions = createUpdatedSessions(false);
      } else {
        // Handle individual session selection
        const filteredValue = value.filter((v) => v !== "All");
        updatedSessions = createUpdatedSessions(false, filteredValue);
      }

      setSessions(updatedSessions);
    },
    [sessions, selected, createUpdatedSessions, setSessions],
  );

  // Display text for the selection button
  const selectionDisplayText = useMemo(() => {
    if (selected.length === 0) return "None";
    if (selected.includes("All")) return "All sessions";
    if (selected.length === 1) return selected[0];
    return `${selected.length} sessions`;
  }, [selected]);

  if (!sessions) {
    return <div className="flex items-baseline gap-4">Loading sessions...</div>;
  }

  return (
    <div className="flex items-baseline gap-4">
      <Listbox multiple value={selected} onChange={handleSelectionChange}>
        <div className="relative z-20 mt-1 max-w-full flex-grow lg:flex-grow-0">
          <Listbox.Label className="flex w-full flex-col text-sm font-medium text-gray-700">
            Session Selection
            <Listbox.Button
              title="Select a session to filter data in the table and averages."
              className={`relative cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm lg:w-full lg:min-w-64 ${isLoading ? "opacity-50" : ""}`}
            >
              <span className="block truncate">
                {isLoading ? "Loading..." : selectionDisplayText}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </Listbox.Label>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                  }`
                }
                value="All"
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      All
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
              {sessionKeys.map((sessionKey) => (
                <Listbox.Option
                  key={sessionKey}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                  value={sessionKey}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {sessionKey}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
