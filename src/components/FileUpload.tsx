import { doc, setDoc } from "firebase/firestore";
import Papa from "papaparse";
import { ChangeEvent, createRef, useContext, useState } from "react";
import { db } from "../firebase";
import { UserContext } from "../provider/UserContext";
import { BaseLoadingSpinner } from "./base/BaseLoadingSpinner";

export const FileUpload = () => {
  const formRef = createRef<HTMLFormElement>();
  const inputRef = createRef<HTMLInputElement>();
  const [csvFile, setCsvFile] = useState<unknown[] | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const uploadFileToFirebaseFirestore = async (results: unknown[] | null) => {
    // uid is the firebase user id
    const uid = user?.uid;
    if (!uid || !results) return;
    // Remove first element in results
    results.shift();
    const docRef = doc(db, "r10data", uid, "data", filename);
    setIsUploading(true);
    await setDoc(docRef, { results });
    setIsUploading(false);
    formRef.current?.reset();
    setCsvFile(null);
  };

  const [error, setError] = useState<string>("");
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    try {
      if (file) {
        if (file.type !== "text/csv" || !file.name.endsWith(".csv"))
          throw new Error("Please upload a valid CSV file.");
        setFilename(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target) return;
          const csvData = e.target.result;
          if (!csvData) return;
          // @ts-expect-error - PapaParse typings are incorrect
          Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
              setCsvFile(results.data);
            },
          });
        };
        reader.readAsText(file);
      }
    } catch (error) {
      setError("Please upload a valid CSV file.");
    }
  };

  return (
    <form
      className="flex flex-col items-end gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        uploadFileToFirebaseFirestore(csvFile);
      }}
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500" htmlFor="file">
          Upload CSV file
        </label>
        <input
          ref={inputRef}
          type="file"
          id="file"
          onChange={handleFileChange}
        />
        <p className="text-red-500 text-sm">{error}</p>
      </div>
      <button
        className={[
          "btn",
          csvFile !== null &&
          isUploading === false &&
          inputRef.current?.value !== ""
            ? "bg-sky-200"
            : "is-disabled",
        ].join(" ")}
        type="submit"
      >
        {isUploading ? <BaseLoadingSpinner /> : "Upload"}
      </button>
    </form>
  );
};
