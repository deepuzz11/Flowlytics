import React, { useContext, useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { DatasetContext } from "../Context/DatasetContext";

const DatasetUploader = () => {
  const {
    dataset = [],  // Default to an empty array if dataset is undefined or null
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

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      setDataset([]);
      setColumn([]);
      return;
    }
  
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await axios.post("http://localhost:3000/upload-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Ensure the response contains dataset and columns
      if (response.data.dataset && response.data.columns) {
        setDataset(response.data.dataset);
        setColumn(response.data.columns);
        toast.success("File uploaded successfully.");
      } else {
        toast.error("No data received.");
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
      toast.error("Error uploading the file.");
    }
  };
  

  // Handle Dataset Deletion
  const handleDelete = async () => {
    if (!dataset || dataset.length === 0) {
      toast.error("No dataset available to delete.");
      return;
    }
  
    // Assuming dataset[0] contains the dataset's unique identifier
    const datasetId = dataset[0]?._id;
  
    if (!datasetId) {
      toast.error("No valid dataset ID found to delete.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:3000/delete-dataset/${datasetId}`);
      if (response.data.message === "Dataset deleted successfully!") {
        setDataset([]);  // Clear the local dataset
        setColumn([]);
        setFileInputKey(Date.now()); // Reset file input
        toast.success("Dataset deleted successfully.", { autoClose: 1000 });
      } else {
        toast.error("Failed to delete dataset.");
      }
    } catch (error) {
      console.error("Error deleting dataset:", error);
      toast.error("Error deleting dataset.");
    }
  };
  
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(dataset) ? dataset.slice(indexOfFirstItem, indexOfLastItem) : [];
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
