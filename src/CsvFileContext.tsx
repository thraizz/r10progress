import { ParseResult } from "papaparse";
import React, { PropsWithChildren, createContext, useState } from "react";

interface CsvFileContextProps {
  csvFile: ParseResult<unknown> | null;
  setCsvFile: (result: ParseResult<unknown> | null) => void;
}

export const CsvFileContext = createContext<CsvFileContextProps>({
  csvFile: null,
  setCsvFile: () => {},
});

export const CsvFileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [parserResult, setParserResult] = useState<ParseResult<unknown> | null>(
    null,
  );

  return (
    <CsvFileContext.Provider
      value={{ csvFile: parserResult, setCsvFile: setParserResult }}
    >
      {children}
    </CsvFileContext.Provider>
  );
};
