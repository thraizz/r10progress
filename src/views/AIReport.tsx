import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { db } from "../firebase";
import { UserContext } from "../provider/UserContext";
import { routes } from "../routes";
import {
  AIAnalysisResult,
  aiReportExample,
  AnalysisReport,
} from "../utils/aiReportExample";

const ScoreIndicator = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`h-2 w-20 rounded-full bg-gray-200`}>
        <div
          className={`h-2 rounded-full ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium">{score}</span>
    </div>
  );
};

const AnalysisSection = ({
  title,
  data,
}: {
  title: string;
  data: {
    score: number;
    consistency: number;
    pattern: string;
    recommendation: string;
  };
}) => (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <div className="mt-2 space-y-3">
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Score</span>
        <ScoreIndicator score={data.score} />
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Consistency</span>
        <ScoreIndicator score={data.consistency} />
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700">Pattern</h4>
        <p className="mt-1 text-sm text-gray-600">{data.pattern}</p>
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700">Recommendation</h4>
        <p className="mt-1 text-sm text-gray-600">{data.recommendation}</p>
      </div>
    </div>
  </div>
);

const DrillCard = ({
  drill,
}: {
  drill: AIAnalysisResult["practiceRecommendations"]["drills"][0];
}) => (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-gray-900">{drill.name}</h3>
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          drill.difficulty === "beginner"
            ? "bg-green-100 text-green-800"
            : drill.difficulty === "intermediate"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        }`}
      >
        {drill.difficulty}
      </span>
    </div>
    <p className="mt-2 text-sm text-gray-600">{drill.purpose}</p>
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700">Steps</h4>
      <ul className="mt-2 list-inside list-decimal space-y-2 text-sm text-gray-600">
        {drill.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700">Success Metrics</h4>
      <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-gray-600">
        {drill.successMetrics.map((metric, index) => (
          <li key={index}>{metric}</li>
        ))}
      </ul>
    </div>
  </div>
);

export const AIReport = () => {
  const { reportId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!user || !reportId) {
        navigate(routes.aiAnalysis);
        return;
      }

      if (reportId === "example") {
        setReport(aiReportExample);
        setLoading(false);
        return;
      }

      try {
        const reportRef = doc(db, `r10data/${user.uid}/reports/${reportId}`);
        const reportDoc = await getDoc(reportRef);

        if (!reportDoc.exists()) {
          setError("Report not found");
          return;
        }

        setReport({ id: reportDoc.id, ...reportDoc.data() } as AnalysisReport);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [user, reportId, navigate]);

  if (loading) {
    return (
      <BasePageLayout>
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </BasePageLayout>
    );
  }

  if (error || !report) {
    return (
      <BasePageLayout>
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error || "Report not found"}</p>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    );
  }

  const { analysis } = report;

  return (
    <BasePageLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Golf Analysis
            </h1>
            <p className="mt-2 text-gray-600">
              Analysis from {format(new Date(report.createdAt), "PPP")} •{" "}
              {report.shotCount} shots analyzed
            </p>
          </div>
          <button
            onClick={() => navigate(routes.aiAnalysis)}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
          >
            Back to Reports
          </button>
        </div>

        {/* Performance Overview */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Performance Overview
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Overall Score
              </h3>
              <ScoreIndicator
                score={analysis.performanceMetrics.overallScore}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Consistency</h3>
              <ScoreIndicator
                score={analysis.performanceMetrics.consistencyScore}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Accuracy</h3>
              <ScoreIndicator
                score={analysis.performanceMetrics.accuracyScore}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Efficiency</h3>
              <ScoreIndicator
                score={analysis.performanceMetrics.efficiencyScore}
              />
            </div>
          </div>
        </div>

        {/* Impact Conditions */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Impact Conditions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnalysisSection
              title="Face Control"
              data={analysis.technicalAnalysis.impactConditions.faceControl}
            />
            <AnalysisSection
              title="Path Control"
              data={analysis.technicalAnalysis.impactConditions.pathControl}
            />
            <AnalysisSection
              title="Strike Quality"
              data={analysis.technicalAnalysis.impactConditions.strikeQuality}
            />
          </div>
        </div>

        {/* Ball Flight */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Ball Flight
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnalysisSection
              title="Launch Conditions"
              data={analysis.technicalAnalysis.ballFlight.launchConditions}
            />
            <AnalysisSection
              title="Spin Control"
              data={analysis.technicalAnalysis.ballFlight.spinControl}
            />
            <AnalysisSection
              title="Dispersion Control"
              data={analysis.technicalAnalysis.ballFlight.dispersionControl}
            />
          </div>
        </div>

        {/* Practice Recommendations */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Practice Plan
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                High Priority Focus
              </h3>
              <p className="mt-2 text-gray-600">
                {analysis.practiceRecommendations.highPriorityFocus}
              </p>
            </div>
            <div className="space-y-4">
              {analysis.practiceRecommendations.drills.map((drill, index) => (
                <DrillCard key={index} drill={drill} />
              ))}
            </div>
          </div>
        </div>

        {/* Statistical Trends */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Statistical Trends
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Distance</h3>
              <p className="mt-1 text-lg font-medium capitalize text-gray-900">
                {analysis.statistics.trends.distanceTrend}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Accuracy</h3>
              <p className="mt-1 text-lg font-medium capitalize text-gray-900">
                {analysis.statistics.trends.accuracyTrend}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Consistency</h3>
              <p className="mt-1 text-lg font-medium capitalize text-gray-900">
                {analysis.statistics.trends.consistencyTrend}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};
