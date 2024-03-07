import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";
import { FileUpload } from "./FileUpload";

export const UploadModal = ({ disabled }: { disabled: boolean }) => {
  return (
    <Popover className="static z-40 sm:relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              "btn btn-secondary flex flex-row items-center justify-center gap-px whitespace-nowrap",
              open ? "text-white" : "text-white/90",
            )}
          >
            <span>Upload File</span>
            <ChevronDownIcon
              className={clsx(
                "h-5 w-5 transition duration-150 ease-in-out group-hover:text-sky-300/80",
                open ? "rotate-180 text-sky-600" : "text-sky-600/70",
              )}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-sky-800 opacity-30 md:hidden" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="fixed left-0 right-0 z-30 mt-3 w-screen transform px-4 sm:absolute sm:left-[unset] sm:max-w-sm sm:px-0 lg:max-w-3xl">
              <div className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-md bg-white p-4 shadow-md ">
                {disabled ? (
                  <p className="text-md">Please login to upload a file.</p>
                ) : (
                  <>
                    <p className="text-md">
                      Upload your CSV file exported from the Garmin Golf App.
                    </p>
                    <p className="text-sm text-yellow-600">
                      <b>Warning:</b> This app requires consistent localization
                      between exports. Otherwise, your clubs will not be
                      recognized across sessions.
                    </p>
                    <FileUpload />
                  </>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
