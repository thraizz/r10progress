interface LoadingState {
  analyzing: boolean;
  generatingReport: boolean;
}

export const LoadingIndicator = ({ state }: { state: LoadingState }) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        {state.analyzing ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        ) : (
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        <span className="ml-2 text-sm text-gray-600">Analyzing shots...</span>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        {state.analyzing ? (
          <div className="h-4 w-4" />
        ) : state.generatingReport ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        ) : (
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        <span className="ml-2 text-sm text-gray-600">
          Generating detailed report...
        </span>
      </div>
    </div>
    <p className="text-sm text-gray-500">
      This process can take up to 30 seconds to complete.
    </p>
  </div>
);
