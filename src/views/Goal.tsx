import type { Goal as GoalType } from "../types/Goals";
import { ProgressBar } from "./ProgressBar";

export const Goal = ({ goal }: { goal: GoalType }) => {
  return (
    <div className="mt-4 max-w-2xl rounded-md bg-white p-4">
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
      </div>
      <ProgressBar progress={goal.progress} />
    </div>
  );
};
