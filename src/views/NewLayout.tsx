import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  FolderIcon,
  HeartIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, PropsWithChildren, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FullScreenSpinner } from "../components/FullScreenSpinner";
import { SessionPicker } from "../components/SessionPicker";
import { UserMenu } from "../components/UserMenu";
import { SessionContext } from "../provider/SessionContext";
import { dashboardRoutes } from "../routes";

// href must be in dashboardRoutes
type NavType = {
  name: string;
  href: string;
  icon: typeof HomeIcon;
};
const navigation: NavType[] = [
  {
    name: "Dashboard",
    href: dashboardRoutes.dashboard,
    icon: HomeIcon,
  },
  {
    name: "Visualization",
    href: dashboardRoutes.visualization,
    icon: ChartBarSquareIcon,
  },
  {
    name: "Sessions",
    href: dashboardRoutes.sessions,
    icon: FolderIcon,
  },
  {
    name: "Goals",
    href: dashboardRoutes.goals,
    icon: ArrowTrendingUpIcon,
  },
];

export const NewLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isLoading } = useContext(SessionContext);

  return (
    <>
      {isLoading && <FullScreenSpinner />}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sky-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <div className="flex h-16 shrink-0 items-center">
                        <span className="text-2xl font-bold text-white">
                          r10progress
                        </span>
                      </div>
                    </div>
                    <div className="block lg:hidden">
                      <SessionPicker />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <NavLink
                                  to={item.href}
                                  className={({ isActive }) =>
                                    clsx(
                                      isActive
                                        ? "bg-sky-700 text-white"
                                        : "text-sky-200 hover:bg-sky-700 hover:text-white",
                                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                    )
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      <item.icon
                                        className={clsx(
                                          isActive
                                            ? "text-white"
                                            : "text-sky-200 group-hover:text-white",
                                          "h-6 w-6 shrink-0",
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </>
                                  )}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                              clsx(
                                isActive
                                  ? "bg-sky-700 text-white"
                                  : "text-sky-200 hover:bg-sky-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                              )
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <Cog6ToothIcon
                                  className={clsx(
                                    isActive
                                      ? "text-white"
                                      : "text-sky-200 group-hover:text-white",
                                    "h-6 w-6 shrink-0",
                                  )}
                                  aria-hidden="true"
                                />
                                Settings
                              </>
                            )}
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sky-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <span className="text-2xl font-bold text-white">r10progress</span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            clsx(
                              isActive
                                ? "bg-sky-700 text-white"
                                : "text-sky-200 hover:bg-sky-700 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon
                                className={clsx(
                                  isActive
                                    ? "text-white"
                                    : "text-sky-200 group-hover:text-white",
                                  "h-6 w-6 shrink-0",
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="https://buymeacoffee.com/aronschueler"
                    target="_blank"
                    rel="noreferrer"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-sky-200 hover:bg-sky-700 hover:text-white"
                  >
                    <HeartIcon
                      className="h-6 w-6 shrink-0 text-sky-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Support me
                  </a>

                  <a
                    href="mailto:info@lakur.tech"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-sky-200 hover:bg-sky-700 hover:text-white"
                  >
                    <EnvelopeIcon
                      className="h-6 w-6 shrink-0 text-sky-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Contact me
                  </a>

                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      clsx(
                        isActive
                          ? "bg-sky-700 text-white"
                          : "text-sky-200 hover:bg-sky-700 hover:text-white",
                        "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )
                    }
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-sky-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Settings
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex shrink-0 items-end justify-between gap-x-4 border-b border-gray-200 bg-white p-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="hidden lg:block">
              <SessionPicker />
            </div>
            <UserMenu />
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};
