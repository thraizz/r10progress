import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { FileUpload } from "./FileUpload";

export const UploadModal = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center rounded-md bg-sky-700 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <span>Upload File</span>
            <ChevronDownIcon
              className={`${open ? "text-sky-300" : "text-sky-300/70"}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-sky-300/80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-1/2 z-10 mt-3 w-screen max-w-sm translate-x-[18%] transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="mx-auto w-full max-w-xl p-4 bg-gray-100 rounded-md shadow-md flex flex-col gap-4">
                <p className="text-md">
                  Upload your CSV file exported from the Garmin Golf App.
                </p>
                <FileUpload />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
