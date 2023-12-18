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
              "btn btn-secondary whitespace-nowrap flex flex-row gap-px items-center justify-center",
              open ? "text-white" : "text-white/90",
            )}
          >
            <span>Upload File</span>
            <ChevronDownIcon
              className={clsx(
                "h-5 w-5 transition duration-150 ease-in-out group-hover:text-sky-300/80",
                open ? "text-sky-600 rotate-180" : "text-sky-600/70",
              )}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Overlay className="md:hidden fixed inset-0 bg-sky-800 opacity-30" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="fixed sm:absolute right-0 left-0 sm:left-[unset] z-30 mt-3 w-screen sm:max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="mx-auto w-full max-w-xl p-4 bg-white rounded-md shadow-md flex flex-col gap-4 ">
                {disabled ? (
                  <p className="text-md">Please login to upload a file.</p>
                ) : (
                  <>
                    <p className="text-md">
                      Upload your CSV file exported from the Garmin Golf App.
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
