import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useClubsPerSession } from "../hooks/useClubsPerSesssion";
import { goalAtom } from "../hooks/useGoals";
import { useIsEnglishDataset } from "../hooks/useIsEnglishDataset.ts";
import {
  GolfSwingDataDE,
  GolfSwingDataEN,
  englishDegreeMetrics,
  englishMetersMetrics,
  germanDegreeMetrics,
  germanMetersMetrics,
  golfSwingDataKeysInMeters,
} from "../types/GolfSwingData";

export const GoalForm = ({ closeAction }: { closeAction: () => void }) => {
  const formMethods = useForm<{
    title: string;
    target: number;
    club?: string;
    metric: keyof GolfSwingDataDE | keyof GolfSwingDataEN;
  }>();

  const isEnglish = useIsEnglishDataset();
  const metricOptions = isEnglish
    ? [...englishDegreeMetrics, ...englishMetersMetrics]
    : [...germanDegreeMetrics, ...germanMetersMetrics];
  const [, setGoals] = useAtom(goalAtom);
  const clubs = useClubsPerSession();
  return (
    <div className="mt-4 rounded-md bg-white p-4">
      <form
        onSubmit={formMethods.handleSubmit((data) => {
          setGoals((goals) => [
            ...goals,
            {
              id: (goals.length + 1).toString(),
              title: data.title,
              target: data.target,
              metric: data.metric,
            },
          ]);
          closeAction();
        })}
      >
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Title"
            {...formMethods.register("title", { required: true })}
            className="input w-full"
          />

          <select
            {...formMethods.register("metric", { required: true })}
            className="input w-full"
          >
            {metricOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            {...formMethods.register("club")}
            className="input w-full"
            defaultValue=""
          >
            {Object.keys(clubs).map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
            <option value="">All clubs</option>
          </select>

          <input
            type="number"
            placeholder={`Target (${
              golfSwingDataKeysInMeters.includes(formMethods.watch("metric"))
                ? "m"
                : "°"
            })`}
            {...formMethods.register("target", { required: true })}
            className="input w-full"
          />
        </div>
        <button type="submit" className="btn mt-4 w-full">
          Add goal
        </button>
      </form>
    </div>
  );
};
