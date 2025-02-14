import { format } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { db, functions } from "../firebase";
import { useMembershipStatus } from "../hooks/useMembershipStatus";
import { useSelectedShots } from "../hooks/useSelectedShots";
import { UserContext } from "../provider/UserContext";
import { routes } from "../routes";
import { AIAnalysisResult, AnalysisReport } from "../utils/aiReportExample";

interface LoadingState {
  analyzing: boolean;
  generatingReport: boolean;
}

const LoadingIndicator = ({ state }: { state: LoadingState }) => (
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

const PreviousReports = ({
  reports,
  onSelectReport,
  isSupporter,
}: {
  reports: AnalysisReport[];
  onSelectReport: (report: AnalysisReport) => void;
  isSupporter: boolean;
}) => (
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

export const AIAnalysis = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { membershipStatus, isCheckingMembership } = useMembershipStatus();

  const shots = useSelectedShots();
  const [loadingState, setLoadingState] = useState<LoadingState>({
    analyzing: false,
    generatingReport: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [previousReports, setPreviousReports] = useState<AnalysisReport[]>([]);

  const analyzeShotPatterns = httpsCallable<any, AIAnalysisResult>(
    functions,
    "analyzeShotPatterns",
  );

  useEffect(() => {
    const fetchPreviousReports = async () => {
      if (!user) return;

      const path = `r10data/${user.uid}/reports`;
      const reportsRef = collection(db, path);
      const q = query(reportsRef, orderBy("createdAt", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const reports: AnalysisReport[] = [];
        querySnapshot.forEach((doc) => {
          reports.push({ id: doc.id, ...doc.data() } as AnalysisReport);
        });

        // If user is not a supporter, add an example report
        reports.unshift(aiReportExample);

        setPreviousReports(reports);
      } catch (error) {
        console.error("Error fetching previous reports:", error);
      }
    };

    fetchPreviousReports();
  }, [user, membershipStatus?.isSupporter]);

  const handleSelectReport = (report: AnalysisReport) => {
    if (!membershipStatus?.isSupporter && report.id !== "example") {
      window.open("https://www.buymeacoffee.com/aronschueler", "_blank");
      return;
    }
    navigate(`${routes.aiAnalysis}/${report.id}`);
  };

  const handleAnalyze = async () => {
    if (!membershipStatus?.isSupporter) {
      window.open("https://www.buymeacoffee.com/aronschueler", "_blank");
      return;
    }

    if (shots.length === 0) {
      setError("No shots available for analysis");
      return;
    }

    setLoadingState({ analyzing: true, generatingReport: false });
    setError(null);

    try {
      setLoadingState({ analyzing: false, generatingReport: true });
      await analyzeShotPatterns({
        shots,
        timeframe: "last session",
      });

      // Refresh the reports list
      if (user) {
        const reportsRef = collection(db, `r10data/${user.uid}/reports`);
        const q = query(reportsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const reports: AnalysisReport[] = [];
        querySnapshot.forEach((doc) => {
          reports.push({ id: doc.id, ...doc.data() } as AnalysisReport);
        });
        setPreviousReports(reports);

        // Navigate to the latest report
        if (reports.length > 0) {
          navigate(`${routes.aiAnalysis}/${reports[0].id}`);
        }
      }
    } catch (err) {
      setError("Failed to analyze shots. Please try again later.");
      console.error("Analysis error:", err);
    } finally {
      setLoadingState({ analyzing: false, generatingReport: false });
    }
  };

  return (
    <BasePageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Golf Analysis</h1>
          <p className="mt-2 text-gray-600">
            Get personalized insights and recommendations for your golf game
            using advanced AI analysis.
          </p>
          {!isCheckingMembership && !membershipStatus?.isSupporter && (
            <div className="mt-4 rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    {membershipStatus?.message ||
                      "This feature is only available to supporters right now."}
                  </p>
                  <p className="mt-3 text-sm md:ml-6 md:mt-0">
                    <a
                      href="https://www.buymeacoffee.com/aronschueler"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                    >
                      Support now <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {shots.length === 0 ? (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      No shots selected
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Please select the sessions you want to receive AI
                        analysis for.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : loadingState.analyzing || loadingState.generatingReport ? (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <LoadingIndicator state={loadingState} />
              </div>
            ) : (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Start Analysis
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Get detailed insights about your swing patterns and
                  consistency.
                </p>
                {!membershipStatus?.isSupporter ? (
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">
                            Support the development on Buy Me a Coffee to
                            unlock:
                          </h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <ul className="list-disc space-y-1 pl-5">
                              <li>Unlimited AI swing analysis</li>
                              <li>Personalized practice recommendations</li>
                              <li>Detailed performance tracking</li>
                              <li>Early access to new features</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        window.open(
                          "https://www.buymeacoffee.com/aronschueler",
                          "_blank",
                        )
                      }
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z" />
                      </svg>
                      Support on Buy Me a Coffee
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleAnalyze}
                  >
                    Analyze My Shots
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <PreviousReports
              reports={previousReports}
              onSelectReport={handleSelectReport}
              isSupporter={membershipStatus?.isSupporter ?? false}
            />
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};
