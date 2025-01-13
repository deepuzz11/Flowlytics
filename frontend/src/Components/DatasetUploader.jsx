import React, { useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const DatasetUploader = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.type !== "text/csv") {
      toast.error("Please upload a CSV file.");
      setData([]); 
      setColumns([]);
      return;
    }

    try {
      // Try parsing the CSV file
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
          setColumns(Object.keys(result.data[0] || {}));
        },
        error: (error) => {
          // Handle parsing errors
          toast.error("Error parsing the CSV file.");
        }
      });
    } catch (error) {
      // Catch any other errors
      toast.error("Something went wrong while processing the file.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Upload a Dataset</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {data.length > 0 && (
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="border px-2 py-1">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col} className="border px-2 py-1">{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DatasetUploader;
