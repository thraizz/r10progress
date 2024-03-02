import { AllDataCombinedTable } from "../components/panels/AllDataCombinedTable";
import { AveragesScatterPlot } from "../components/panels/AveragesScatterPlot";
import { AveragesTable } from "../components/panels/AveragesTable";

export const DataView = () => (
  <div className="flex flex-grow flex-col gap-8 bg-gray-200 py-8">
    <div className="flex mx-8 flex-col items-center justify-center">
      <div className="w-full p-4 bg-gray-100 rounded-md shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Sessions</h2>
        <AllDataCombinedTable />
        <AveragesTable />
        <AveragesScatterPlot />
      </div>
    </div>
  </div>
);