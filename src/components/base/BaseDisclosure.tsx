import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

type BaseDisclosureProps = {
  title: string;
  children: React.ReactNode;
};

export const BaseDisclosure = ({ title, children }: BaseDisclosureProps) => {
  return (
    <Disclosure defaultOpen={true} as="div" className="mt-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500/75">
            <h3 className="text-xl font-bold">{title}</h3>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-sky-500 self-center`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="pt-4 text-sm text-gray-500 mb-6">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
