import { useTrackingConsent } from "../../provider/TrackingConsentContext";

export const TrackingSettings = () => {
  const { hasConsented, setHasConsented, setShowConsentDialog } =
    useTrackingConsent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setShowConsentDialog(true);
    } else {
      setHasConsented(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hasConsented}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
        />
        <span className="text-sm text-gray-700">
          Allow session recording to help improve the application
        </span>
      </label>
      <p className="text-xs text-gray-500">
        With your consent we use Mouseflow to record how you interact with the
        app (clicks, scrolling, navigation) so we can find and fix usability
        problems. Turning this off limits no feature. See our{" "}
        <a
          className="underline"
          href="https://r10progress.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};
