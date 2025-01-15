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

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      setDataset([]);
      setColumn([]);
      return;
    }

    setIsLoading(true);

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

        setDataset(cleanedData); // Update dataset
        setColumn(Object.keys(cleanedData[0] || {})); 
        setIsLoading(false);
      },
      error: () => {
        toast.error("Error parsing the CSV file.");
        setIsLoading(false);
      },
    });
  };

  const handleDelete = () => {
    setDataset([]); 
    setColumn([]);
    setFileInputKey(Date.now());
    toast.success("Dataset deleted successfully.", { autoClose: 1000 });
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataset.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataset.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-7">
      <h2 className="text-4xl font-semibold text-center text-blue-800 mb-6">
        Upload Your Dataset
      </h2>

      {/* File Input and Delete Button */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <input
          key={fileInputKey}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none"
        />
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          className="flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded-md text-white"
        >
          <AiFillDelete size={20} /> Delete Dataset
        </Button>
      </div>

      {/* Table Display */}
      {isLoading ? (
        <h1 className="text-center text-lg text-gray-500">Loading...</h1>
      ) : (
        dataset.length > 0 && (
          <>
            <div className="overflow-x-auto shadow-lg max-h-96">
              <table className="min-w-full border-collapse text-sm rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    {column.map((col, index) => (
                      <th key={index} className="border px-6 py-3 text-left text-black font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50`}
                    >
                      {column.map((col) => (
                        <td key={col} className="border px-6 py-3 text-gray-800">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <Button
                variant="contained"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="text-gray-700 hover:bg-gray-600 bg-slate-500"
              >
                Prev
              </Button>
              <Button
                variant="contained"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="text-gray-700 hover:bg-gray-600"
              >
                Next
              </Button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DatasetUploader;
