import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext, useEffect, useState } from "react";
import { SessionContext } from "../provider/SessionContext";
import { Sessions } from "../types/Sessions";

export const SessionPicker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const { sessions, setSessions, fetchSnapshot, initialized } =
    useContext(SessionContext);
  useEffect(() => {
    const _ = async () => await fetchSnapshot();
    if (!initialized)
      _().then((fetchedSessions) => {
        if (fetchedSessions) {
          setSessions(fetchedSessions);
          setSelected(Object.keys(fetchedSessions));
        }
      });
  }, [fetchSnapshot, setSessions, sessions, initialized]);

  const writeSelected = (value: string[]) => {
    const setAll = value.includes("All") && !selected.includes("All");
    if (setAll) {
      setSelected([...Object.keys(sessions!), "All"]);
      return setSessions(
        Object.keys(sessions!).reduce((acc, curr) => {
          acc[curr] = { ...sessions![curr], selected: true };
          return acc;
        }, {} as Sessions),
      );
    } else {
      setSelected(value.filter((v) => v !== "All"));

      setSessions(
        Object.keys(sessions!).reduce((acc, curr) => {
          acc[curr] = { ...sessions![curr], selected: value.includes(curr) };
          return acc;
        }, {} as Sessions),
      );
    }
  };

  return (
    <div className="flex items-baseline gap-4">
      <Listbox multiple value={selected} onChange={writeSelected}>
        <div className="relative z-20 mb-4 mt-1 max-w-full flex-grow lg:flex-grow-0">
          <Listbox.Label className="flex w-full flex-col text-sm font-medium text-gray-700">
            Session Selection
            <Listbox.Button
              title="Select a session to filter data in the table and averages."
              className="relative h-8  cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm lg:w-full lg:min-w-64"
            >
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
