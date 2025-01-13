import React, { useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";

const DatasetUploader = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // To reset file input

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      setData([]);
      setColumns([]);
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // Replace "�" with "_" in the parsed data
        const cleanedData = result.data.map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key,
              typeof value === "string" ? value.replace(/�/g, "_") : value,
            ])
          )
        );

        setData(cleanedData);
        setColumns(Object.keys(cleanedData[0] || {}));
      },
      error: () => {
        toast.error("Error parsing the CSV file.");
      },
    });
  };

  const handleDelete = () => {
    setData([]);
    setColumns([]);
    setFileInputKey(Date.now()); // Reset the file input
    toast.success("Dataset deleted successfully.", { autoClose: 1000 });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-md mt-7">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        Upload a Dataset
      </h2>

      {/* File Input and Delete Button */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <input
          key={fileInputKey} // Reset file input by changing key
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          className="flex items-center"
        >
          <AiFillDelete className="mr-2" size={18} /> Delete Dataset
        </Button>
      </div>

      {/* Display Table */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm rounded-md">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="border px-4 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col} className="border px-4 py-2">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DatasetUploader;
