import { useAveragedSwings } from "../../utils/calculateAverages";
import { ClubStats } from "../ClubStats";
import { IQRNote } from "../IQRNote";

export const Last30DaysAverages = () => {
  const averages = useAveragedSwings();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="mb-4 text-3xl font-semibold leading-6 text-gray-900">
        Your club averages
      </h3>
      <IQRNote />
      <div className="flex flex-col gap-8">
        {averages.map((average) => (
          <ClubStats key={average.name} average={average} />
        ))}
      </div>
    </div>
  );
};
