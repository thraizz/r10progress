import { Dialog, Transition } from "@headlessui/react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { FunctionsError, httpsCallable } from "firebase/functions";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, functions } from "../../firebase";
import { UserContext } from "../../provider/UserContext";
import { routes } from "../../routes";
import { downloadUserDataExport } from "../../utils/exportUserData";

interface DeleteAccountResponse {
  deletedDocuments: number;
}

const getErrorMessage = (error: unknown): string => {
  const code = (error as FunctionsError)?.code;
  switch (code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "That password is not correct. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "unauthenticated":
      return "Your session expired. Please sign in again and retry.";
    default:
      return (
        (error as Error)?.message ??
        "Something went wrong. Please try again, or contact aron@r10progress.com."
      );
  }
};

export const DangerZone = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string>();

  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string>();

  const handleExport = async () => {
    if (!user?.uid) return;
    setIsExporting(true);
    setExportError(undefined);
    try {
      await downloadUserDataExport(user);
    } catch (error) {
      setExportError(getErrorMessage(error));
    } finally {
      setIsExporting(false);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setPassword("");
    setDeleteError(undefined);
  };

  const handleDelete = async () => {
    if (!user?.email) return;
    setIsDeleting(true);
    setDeleteError(undefined);
    try {
      // Firebase requires a recent sign-in for destructive operations, and it
      // makes sure the person at the keyboard is the account owner.
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, password),
      );

      await httpsCallable<void, DeleteAccountResponse>(
        functions,
        "deleteAccount",
      )();

      await signOut(auth);
      navigate(routes.login, { replace: true });
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-md border border-red-200 bg-red-50 p-4">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-gray-900">Export your data</h4>
        <p className="text-sm text-gray-600">
          Download everything we store for your account — uploaded sessions, AI
          reports, and settings — as a JSON file.
        </p>
        <div>
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            {isExporting ? "Preparing export…" : "Export my data"}
          </button>
        </div>
        {exportError && <p className="text-sm text-red-700">{exportError}</p>}
      </div>

      <div className="flex flex-col gap-2 border-t border-red-200 pt-4">
        <h4 className="font-semibold text-gray-900">Delete your account</h4>
        <p className="text-sm text-gray-600">
          This permanently deletes your account, your uploaded sessions, your AI
          reports, and your settings. This cannot be undone. Records of
          donations and memberships are kept in anonymized form because tax law
          requires us to retain them.
        </p>
        <div>
          <button
            type="button"
            onClick={() => setShowDialog(true)}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Delete my account
          </button>
        </div>
      </div>

      <Transition.Root show={showDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Delete your account?
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-600">
                    Your account and all data we hold for it will be deleted
                    immediately and cannot be recovered. Enter your password to
                    confirm.
                  </p>
                  <label
                    className="mt-4 block text-sm font-medium text-gray-700"
                    htmlFor="delete-account-password"
                  >
                    Password
                  </label>
                  <input
                    id="delete-account-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                  {deleteError && (
                    <p className="mt-2 text-sm text-red-700">{deleteError}</p>
                  )}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeDialog}
                      disabled={isDeleting}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleting || password.length === 0}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting…" : "Delete permanently"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
