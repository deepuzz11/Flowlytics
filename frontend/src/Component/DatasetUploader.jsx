import React, { useContext, useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import { DatasetContext } from "../Context/DatasetContext";


const DatasetUploader = () => {
  const {
    dataset,
    setDataset,
    column,
    setColumn,
    isLoading,
    setIsLoading,
  } = useContext(DatasetContext);

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      setDataset([]);
      setColumn([]);
      return;
    }

    setIsLoading(true); // Show loading state while processing

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const cleanedData = result.data.map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key,
              typeof value === "string" ? value.replace(/�/g, "_") : value,
            ])
          )
        );

        setDataset(cleanedData); // Update dataset in context
        setColumn(Object.keys(cleanedData[0] || {})); // Update columns in context
        setIsLoading(false); // Stop loading state
      },
      error: () => {
        toast.error("Error parsing the CSV file.");
        setIsLoading(false); // Stop loading state
      },
    });
  };

  const handleDelete = () => {
    setDataset([]); // Clear dataset in context
    setColumn([]); // Clear columns in context
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
          key={fileInputKey}
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
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        dataset.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  {column.map((col, index) => (
                    <th key={index} className="border px-4 py-2 text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {column.map((col) => (
                      <td key={col} className="border px-4 py-2">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default DatasetUploader;
