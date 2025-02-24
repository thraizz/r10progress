export interface AnalysisReport {
  id: string;
  userId: string;
  createdAt: string;
  shotCount: number;
  timeframe: string;
  filename: string;
  analysis: AIAnalysisResult;
}
export interface AIAnalysisResult {
  technicalAnalysis: {
    impactConditions: {
      faceControl: {
        score: number;
        consistency: number;
        pattern: string;
        recommendation: string;
      };
      pathControl: {
        score: number;
        consistency: number;
        pattern: string;
        recommendation: string;
      };
      strikeQuality: {
        score: number;
        consistency: number;
        pattern: string;
        recommendation: string;
      };
    };
    ballFlight: {
      launchConditions: {
        score: number;
        consistency: number;
        pattern: string;
        recommendation: string;
      };
      spinControl: {
        score: number;
        consistency: number;
        pattern: string;
        recommendation: string;
      };
      dispersionControl: {
        score: number;
        consistency: number;
        pattern: string;
        recommendation: string;
      };
    };
  };
  performanceMetrics: {
    consistencyScore: number;
    accuracyScore: number;
    efficiencyScore: number;
    overallScore: number;
  };
  practiceRecommendations: {
    highPriorityFocus: string;
    drills: Array<{
      name: string;
      purpose: string;
      steps: string[];
      successMetrics: string[];
      difficulty: "beginner" | "intermediate" | "advanced";
    }>;
  };
  statistics: {
    consistencyMetrics: {
      ballSpeedConsistency: number;
      launchAngleConsistency: number;
      spinRateConsistency: number;
      dispersionPattern: {
        averageOffline: number;
        dispersionEllipse: {
          width: number;
          length: number;
        };
      };
    };
    commonIssues: string[];
    trends: {
      distanceTrend: "improving" | "declining" | "stable";
      accuracyTrend: "improving" | "declining" | "stable";
      consistencyTrend: "improving" | "declining" | "stable";
    };
  };
}

export const aiReportExample: AnalysisReport = {
  id: "example",
  userId: "example",
  createdAt: new Date().toISOString(),
  shotCount: 25,
  timeframe: "Example Report",
  filename: "example.csv",
  analysis: {
    technicalAnalysis: {
      impactConditions: {
        faceControl: {
          score: 85,
          consistency: 78,
          pattern: "Consistently square face at impact",
          recommendation: "Keep up the good work on face control",
        },
        pathControl: {
          score: 72,
          consistency: 65,
          pattern: "Slight in-to-out path tendency",
          recommendation: "Work on neutralizing path for better consistency",
        },
        strikeQuality: {
          score: 80,
          consistency: 75,
          pattern: "Good center contact with occasional heel strikes",
          recommendation: "Practice with impact tape to improve consistency",
        },
      },
      ballFlight: {
        launchConditions: {
          score: 88,
          consistency: 82,
          pattern: "Optimal launch angles for driver",
          recommendation: "Maintain current launch conditions",
        },
        spinControl: {
          score: 76,
          consistency: 70,
          pattern: "Moderate spin rates with some variation",
          recommendation: "Focus on consistent attack angle",
        },
        dispersionControl: {
          score: 82,
          consistency: 77,
          pattern: "Tight dispersion with slight right bias",
          recommendation: "Work on alignment and path control",
        },
      },
    },
    performanceMetrics: {
      consistencyScore: 75,
      accuracyScore: 82,
      efficiencyScore: 78,
      overallScore: 78,
    },
    practiceRecommendations: {
      highPriorityFocus: "Path control and spin consistency",
      drills: [
        {
          name: "Path Control Drill",
          purpose: "Improve swing path consistency",
          steps: ["Setup alignment sticks", "Practice with slow motion swings"],
          successMetrics: [
            "Consistent divot pattern",
            "Ball flight starts on line",
          ],
          difficulty: "intermediate",
        },
      ],
    },
    statistics: {
      consistencyMetrics: {
        ballSpeedConsistency: 92,
        launchAngleConsistency: 88,
        spinRateConsistency: 85,
        dispersionPattern: {
          averageOffline: 12.5,
          dispersionEllipse: {
            width: 25,
            length: 45,
          },
        },
      },
      commonIssues: ["Slight path inconsistency", "Variable spin rates"],
      trends: {
        distanceTrend: "improving",
        accuracyTrend: "stable",
        consistencyTrend: "improving",
      },
    },
  },
};
