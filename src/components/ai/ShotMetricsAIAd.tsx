export const ShotMetricsAIAd = () => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <svg
          className="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-gray-900">
          Looking for more comprehensive analysis?
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Try{" "}
          <a
            href="https://shotmetrics-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green-600 hover:text-green-500"
          >
            ShotMetrics AI
          </a>{" "}
          for complete swing analysis, insights, trends, visualization, and
          personalized drills.
        </p>
      </div>
    </div>
  </div>
);
