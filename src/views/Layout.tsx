import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren, useContext } from "react";
import { SessionPicker } from "../components/SessionPicker";
import { UserMenu } from "../components/UserMenu";
import { UserContext } from "../provider/UserContext";
import { NavLink } from "react-router-dom";

export const Layout = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user?.uid;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex flex-col gap-4 bg-sky-50 px-6 py-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">r10progress</h1>
            {!isLoggedIn && (
              <p className="text-md">
                A tool to track golf shot progress when using the Garmin
                Approach R10.
              </p>
            )}
          </div>
          <UserMenu />
        </div>
        {isLoggedIn && (
          <>
            <div className="flex gap-2 border-b-2 border-gray-200 text-lg font-semibold [&>.active]:underline ">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/goals">Goals</NavLink>
            </div>
            <SessionPicker />
          </>
        )}
      </header>
      {children}
      <footer className="flex h-16 flex-row items-center justify-center gap-2 bg-sky-50 px-6 py-4">
        <p className="text-md">
          Created by{" "}
          <a className="underline" href="https://aronschueler.de/">
            Aron Schüler
          </a>
        </p>
        <a href="mailto:r10progress@lakur.tech" className="ml-2 flex underline">
          <EnvelopeIcon className="h-5 w-5" />
        </a>
      </footer>
    </div>
  );
};
