import { format } from "date-fns";
import { AnalysisReport } from "../../utils/aiReportExample";

interface PreviousReportsProps {
  reports: AnalysisReport[];
  onSelectReport: (report: AnalysisReport) => void;
  isSupporter: boolean;
}

export const PreviousReports = ({
  reports,
  onSelectReport,
  isSupporter,
}: PreviousReportsProps) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-900">
      {isSupporter ? "Previous Reports" : "Example Report"}
    </h2>
    <div className="mt-4 divide-y divide-gray-200">
      {reports.length === 0 ? (
        <p className="text-sm text-gray-500">No previous reports found.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            className="flex cursor-pointer items-center justify-between py-4 hover:bg-gray-50"
            onClick={() => onSelectReport(report)}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {report.id === "example"
                  ? "Example Report"
                  : `Analysis from ${format(new Date(report.createdAt), "PPP")}`}
              </p>
              <p className="text-sm text-gray-500">
                {report.shotCount} shots analyzed
              </p>
            </div>
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))
      )}
    </div>
  </div>
);
