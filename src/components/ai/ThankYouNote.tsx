export const ThankYouNote = () => (
  <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <div className="ml-2">
        <p className="text-xs text-gray-600">
          Thank you for supporting the development of R10 Progress! Your support
          helps me create better tools for golfers.
        </p>
      </div>
    </div>
  </div>
);
