import { Tab } from "@headlessui/react";
import { DemoModeButton } from "../components/authentication/DemoModeButton";
import { LoginForm } from "../components/authentication/LoginForm";
import { RegisterForm } from "../components/authentication/RegisterForm";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Authentication = () => (
  <section className="flex flex-col flex-grow gap-8 items-center py-12 bg-gray-50">
    <div className="mx-auto max-w-4xl p-4 bg-white rounded-md shadow-md flex flex-col gap-4">
      <Tab.Group>
        <Tab.List className="-mb-px flex">
          <Tab className="focus-visible:outline-none w-full pb-4">
            {({ selected }) => (
              <span
                className={classNames(
                  selected
                    ? "border-sky-500 text-sky-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 text-sm font-medium w-full text-center pb-4 block",
                )}
              >
                Login
              </span>
            )}
          </Tab>
          <Tab className="focus-visible:outline-none w-full pb-4">
            {({ selected }) => (
              <span
                className={classNames(
                  selected
                    ? "border-sky-500 text-sky-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 text-sm font-medium w-full text-center pb-4 block",
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
