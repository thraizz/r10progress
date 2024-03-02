import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren, useContext } from "react";
import { SessionPicker } from "../components/SessionPicker";
import { UserMenu } from "../components/UserMenu";
import { UserContext } from "../provider/UserContext";

export const Layout = ({ children }: PropsWithChildren) => {
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
      {children}
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
