import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { BasePageLayout } from "../components/base/BasePageLayout";
import {
  GolfSwingDataDE,
  GolfSwingDataEN,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../types/GolfSwingData";
import { useAveragedSwings } from "../utils/calculateAverages";

export const Goals = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Goals</h2>

    <GoalList />
  </BasePageLayout>
);

const GoalList = () => {
  const goals = useGoals();

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Your goals</h2>
      {goals.map((goal) => (
        <Goal key={goal.id} goal={goal} />
      ))}
      <GoalForm />
    </div>
  );
};

const Goal = ({ goal }: { goal: Goal }) => {
  return (
    <div className="mt-4 rounded-md bg-white p-4">
      <h3 className="text-lg font-semibold">{goal.title}</h3>
      <hr />
      <div className="flex flex-col justify-between text-lg lg:flex-row">
        <p>
          Current: <b>{goal.current + goal.unit}</b>
        </p>
        <p>
          Target: <b>{goal.target + goal.unit}</b>
        </p>
        <p>
          Progress: <b>{goal.progressText}</b>
        </p>
        <ProgressBar progress={goal.progress} />
      </div>
    </div>
  );
};

type Goal = {
  id: string;
  title: string;
  current: string | number | null | undefined;
  target: number;
  progressText: string;
  progress: number;
  unit: string;
};

type PartialGoal = {
  id: string;
  title: string;
  target: number;
  metric: keyof GolfSwingDataDE | keyof GolfSwingDataEN;
};

const useGoals: () => Goal[] = () => {
  const averages = useAveragedSwings();
  const [goals] = useAtom(goalAtom);

  const calculateGoalProgress = (partialGoal: PartialGoal) => {
    const current =
      averages.find((average) => average.name === "Driver")?.[
        "Carry Distance"
      ] ||
      averages.find((average) => average.name === "Driver")?.["Gesamtstrecke"];

    const progress = current ? (current / partialGoal.target) * 100 : 0;
    const progressText = `${(current ? (current / partialGoal.target) * 100 : 0).toFixed(2)}%`;
    const unit = golfSwingDataKeysInMeters.includes(partialGoal.metric)
      ? "m"
      : golfSwingDataKeysInDegrees.includes(partialGoal.metric)
        ? "°"
        : "";
    return { progress, progressText, current, unit };
  };

  return goals.map((goal) => ({
    ...goal,
    ...calculateGoalProgress(goal),
  }));
};

const goalAtom = atom<PartialGoal[]>([
  {
    id: "1",
    title: "Driving distance",
    target: 200,
    metric: "Gesamtstrecke",
  },
]);

const GoalForm = () => {
  const formMethods = useForm<{
    title: string;
    target: number;
    metric: keyof GolfSwingDataDE | keyof GolfSwingDataEN;
  }>();

  const metricOptions = [
    ...golfSwingDataKeysInDegrees,
    ...golfSwingDataKeysInMeters,
  ];
  const [, setGoals] = useAtom(goalAtom);
  return (
    <div className="mt-4 rounded-md bg-white p-4">
      <h3 className="text-lg font-semibold">Add a new goal</h3>
      <form
        onSubmit={formMethods.handleSubmit((data) =>
          setGoals((goals) => [
            ...goals,
            {
              id: (goals.length + 1).toString(),
              title: data.title,
              target: data.target,
              metric: data.metric,
            },
          ]),
        )}
      >
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Title"
            {...formMethods.register("title", { required: true })}
            className="input"
          />

          <select
            {...formMethods.register("metric", { required: true })}
            className="input"
          >
            {metricOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder={`Target (${
              golfSwingDataKeysInMeters.includes(formMethods.watch("metric"))
                ? "m"
                : "°"
            })`}
            {...formMethods.register("target", { required: true })}
            className="input"
          />
        </div>
        <button type="submit" className="btn mt-4">
          Add goal
        </button>
      </form>
    </div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative pt-1">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="inline-block rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
            {progress.toFixed(2)}%
          </span>
        </div>
        <div className="text-right">
          <span className="inline-block text-xs font-semibold text-blue-600">
            100%
          </span>
        </div>
      </div>
      <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
        <div
          style={{ width: `${progress}%` }}
          className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none"
        ></div>
      </div>
    </div>
  );
};
