import { useContext } from "react";
import { CsvFileContext } from "./CsvFileContext";
import { SummaryPerClub } from "./SummaryPerClub";
import { Table } from "./Table";

export const DataRepresentation = () => {
  const { csvFile } = useContext(CsvFileContext);
  return (
    <>
      <SummaryPerClub jsonFile={csvFile} />
      <Table jsonFile={csvFile} />
    </>
  );
};
