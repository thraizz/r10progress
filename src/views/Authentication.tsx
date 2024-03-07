import { Tab } from "@headlessui/react";
import { DemoModeButton } from "../components/authentication/DemoModeButton";
import { LoginForm } from "../components/authentication/LoginForm";
import { RegisterForm } from "../components/authentication/RegisterForm";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Authentication = () => (
  <section className="flex flex-grow flex-col items-center gap-8 bg-gray-50 py-12">
    <div className="mx-auto flex w-full max-w-96 flex-col gap-4 rounded-md bg-white p-4 shadow-md">
      <Tab.Group>
        <Tab.List className="-mb-px flex">
          <Tab className="w-full pb-4 focus-visible:outline-none">
            {({ selected }) => (
              <span
                className={classNames(
                  selected
                    ? "border-sky-500 text-sky-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "block w-full whitespace-nowrap border-b-2 pb-4 text-center text-sm font-medium",
                )}
              >
                Login
              </span>
            )}
          </Tab>
          <Tab className="w-full pb-4 focus-visible:outline-none">
            {({ selected }) => (
              <span
                className={classNames(
                  selected
                    ? "border-sky-500 text-sky-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "block w-full whitespace-nowrap border-b-2 pb-4 text-center text-sm font-medium",
                )}
              >
                Register
              </span>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <LoginForm />
          </Tab.Panel>
          <Tab.Panel>
            <RegisterForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
    <DemoModeButton />
  </section>
);
