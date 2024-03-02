import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { Authentication } from "./Authentication";
import { AveragesScatterPlot } from "./AveragesScatterPlot";
import { AveragesTable } from "./AveragesTable";
import { DataTable } from "./DataTable";
import { SessionPicker } from "./SessionPicker";
import { UserMenu } from "./UserMenu";
import { UserContext } from "./UserProvider";

export const App = () => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user?.uid;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-row items-center justify-between h-32 bg-sky-50 px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">r10progress</h1>
          {!isLoggedIn && (
            <p className="text-md">
              A tool to track golf shot progress when using the Garmin Approach
              R10.
            </p>
          )}
        </div>
        {isLoggedIn && <SessionPicker />}
        <UserMenu />
      </header>
      {isLoggedIn ? (
        <div className="flex flex-grow flex-col gap-8 bg-gray-200 py-8">
          <div className="flex mx-8 flex-col items-center justify-center">
            <div className="w-full p-4 bg-gray-100 rounded-md shadow-md flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Sessions</h2>
              <DataTable />
              <AveragesTable />
              <AveragesScatterPlot />
            </div>
          </div>
        </div>
      ) : (
        <Authentication />
      )}
      <footer className="flex flex-row items-center justify-center h-16 bg-sky-50 px-6 py-4 gap-2">
        <p className="text-md">
          Created by{" "}
          <a className="underline" href="https://aronschueler.de/">
            Aron Schüler
          </a>
        </p>
        <a href="mailto:r10progress@lakur.tech" className="ml-2 flex underline">
          <EnvelopeIcon className="w-5 h-5" />
        </a>
      </footer>
    </div>
  );
};
