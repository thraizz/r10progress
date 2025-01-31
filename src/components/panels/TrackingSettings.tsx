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
          Allow anonymous usage tracking to help improve the application
        </span>
      </label>
      <p className="text-xs text-gray-500">
        We use Mouseflow to analyze how visitors use our site. This helps us
        improve the user experience. The tracking is completely anonymous and
        does not collect any personal information.
      </p>
    </div>
  );
};
