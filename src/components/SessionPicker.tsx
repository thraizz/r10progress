import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { collection, getDocs } from "firebase/firestore";
import { Fragment, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { SessionContext } from "../provider/SessionContext";
import { UserContext } from "../provider/UserContext";
import { Session, Sessions } from "../types/Sessions";
import { reduceSessionToDefinedValues } from "../utils";
import { BaseLabel } from "./base/BaseLabel";
import { filterResultsWithMissingCells } from "../utils/filterResultsWithMissingCells";

const filterSessions = (sessions: Sessions) =>
  filterResultsWithMissingCells(sessions);

export const SessionPicker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const { sessions, setSessions } = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const uuid = user?.isAnonymous ? "6U4S2ruwXMPrULj50b9uLpsaRk53" : user?.uid;

  useEffect(() => {
    async function fetchSnapshot() {
      if (uuid) {
        const querySnapshot = await getDocs(
          collection(db, "r10data", uuid, "data"),
        );
        const fetchedSessions = querySnapshot.docs.reduce((acc, curr) => {
          const data = reduceSessionToDefinedValues(curr.data() as Session);
          acc[curr.id] = { ...data, selected: true };
          return acc;
        }, {} as Sessions);

        setSessions(filterSessions(fetchedSessions));
        setSelected([Object.keys(fetchedSessions)?.[0]]);
        return querySnapshot;
      }
    }
    if (uuid) {
      fetchSnapshot();
    }
  }, [uuid, setSessions]);

  const writeSelected = (value: string[]) => {
    if (value.includes("All")) {
      setSelected([...Object.keys(sessions!), "All"]);
      return setSessions(
        Object.keys(sessions!).reduce((acc, curr) => {
          acc[curr] = { ...sessions![curr], selected: true };
          return acc;
        }, {} as Sessions),
      );
    } else {
      setSelected(value);

      setSessions(
        Object.keys(sessions!).reduce((acc, curr) => {
          acc[curr] = { ...sessions![curr], selected: value.includes(curr) };
          return acc;
        }, {} as Sessions),
      );
    }
  };

  return (
    <div>
      <BaseLabel>
        Select a session to filter data in the table and averages.
      </BaseLabel>
      <Listbox multiple value={selected} onChange={writeSelected}>
        <div className="relative mt-1 z-20 mb-4">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
            <span className="block truncate">
              {selected.length < 2 ? selected : `${selected.length} sessions`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
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
              {sessions &&
                Object.keys(sessions).map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person}
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
