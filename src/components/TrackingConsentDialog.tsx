import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTrackingConsent } from "../provider/TrackingConsentContext";

export const TrackingConsentDialog = () => {
  const { showConsentDialog, setShowConsentDialog, setHasConsented } =
    useTrackingConsent();

  const handleAccept = () => {
    setHasConsented(true);
    setShowConsentDialog(false);
  };

  const handleDecline = () => {
    setHasConsented(false);
    setShowConsentDialog(false);
  };

  return (
    <Transition.Root show={showConsentDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setShowConsentDialog(false)}
      >
        {/* Mobile overlay */}
        <div className="sm:hidden">
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
        </div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          {/* Desktop toast-style bar */}
          <div className="hidden sm:block">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-full opacity-0"
            >
              <div className="fixed bottom-0 left-0 right-0 flex transform flex-col items-end justify-center gap-4 bg-white p-6 shadow-lg">
                <div className="flex w-full items-center justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Help Us Improve Your Experience
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      We use Mouseflow to analyze how visitors use our site.
                      This helps us improve the user experience. The tracking is
                      completely anonymous and does not collect any personal
                      information.
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-4">
                    <button
                      type="button"
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={handleDecline}
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      onClick={handleAccept}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
          {/* Mobile modal */}
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Help Us Improve Your Experience
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        We use Mouseflow to analyze how visitors use our site.
                        This helps us improve the user experience and make our
                        application better for everyone. The tracking is
                        completely anonymous and does not collect any personal
                        information.
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        By accepting, you agree to allow us to collect usage
                        data through Mouseflow. You can change this setting at
                        any time in your preferences.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={handleDecline}
                  >
                    Decline
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
