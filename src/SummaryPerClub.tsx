export const SummaryPerClub = ({
  jsonFile,
}: {
  jsonFile: ParseResult<unknown> | null;
}) => {
  type Average = {
    distance: number;
    angle: number;
    count: number;
    spin: number;
    clubheadSpeed: number;
    ballSpeed: number;
    smashFactor: number;
  };
  // await verages are the Gesamtstrecke, Gesamtabweichungswinkel for each club ("Schlägerart")
  let averages = jsonFile?.data.reduce((acc, curr, i) => {
    if (i === 0) return acc;
    const {
      Schlägerart: club,
      Gesamtstrecke: distance,
      Gesamtabweichungswinkel: angle,
      Drehrate: spin,
      "Schl.gsch.": clubheadSpeed,
      Ballgeschwindigkeit: ballSpeed,
    } = curr;
    if (!club) return acc;
    if (!acc[club]) {
      acc[club] = {
        distance,
        angle,
        count: 1,
        spin,
        clubheadSpeed,
        ballSpeed,
        smashFactor: ballSpeed / clubheadSpeed,
      };
    } else {
      acc[club].distance += distance;
      acc[club].angle += angle;
      acc[club].count += 1;
      acc[club].spin += spin;
      acc[club].clubheadSpeed += clubheadSpeed;
      acc[club].ballSpeed += ballSpeed;
      acc[club].smashFactor += ballSpeed / clubheadSpeed;
    }
    return acc;
  }, {} as Average[]);
  if (averages)
    averages = Object.keys(averages).map((club) => {
      return {
        club,
        distance: averages[club].distance / averages[club].count,
        angle: averages[club].angle / averages[club].count,
        spin: averages[club].spin / averages[club].count,
        clubheadSpeed: averages[club].clubheadSpeed / averages[club].count,
        ballSpeed: averages[club].ballSpeed / averages[club].count,
        smashFactor: averages[club].smashFactor / averages[club].count,
      };
    });

  console.log(averages);
  return (
    <div>
      <h1>Summary per club</h1>
      {jsonFile ? (
        <table className="table-fixed">
          <thead>
            <tr className="bg-gray-100 border-2 border-collapse border-gray-300">
              {Object.keys(averages?.[0]).map((field) => (
                <th
                  className="px-4 py-2 border-2 border-collapse border-gray-300"
                  key={field}
                >
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-100 border-2 border-collapse border-gray-300">
            {averages?.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((key) => (
                  <td
                    className="px-4 py-2 border-2 border-collapse border-gray-300"
                    key={`${key}-${row[key]}`}
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
