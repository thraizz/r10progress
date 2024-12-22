import { useBestShots } from "../../utils/calculateAverages";
import { ClubStats } from "../ClubStats";

export const ClubDistances = () => {
  const { averages } = useBestShots();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="mb-4 text-3xl font-semibold leading-6 text-gray-900">
        Club Distances
      </h3>
      <p className="text-lg text-gray-500">
        This panel shows the average stats of your 10 best shots.
      </p>
      <div className="flex flex-col gap-8">
        {averages.map((average) => (
          <ClubStats key={average.name} average={average} />
        ))}
      </div>
    </div>
  );
};
