import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";  // Make sure to import the toast library

const DataCleaningTools = () => {
  <ToastContainer/>
  // State to track the status of each tool
  const [toolsStatus, setToolsStatus] = useState({
    missingValues: "Not Processed",
    normalization: "Not Processed",
    encoding: "Not Processed",
  });

  // Function to handle missing values tool
  const handleMissingValues = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/data-cleaning/missing-values"); // Flask API
      setToolsStatus({ ...toolsStatus, missingValues: "Processed" });
      toast.success("Missing values processed successfully!");  // Show success toast
    } catch (error) {
      console.error("Error handling missing values", error);
      toast.error("Failed to handle missing values.");  // Show error toast
    }
  };

  // Function to handle data normalization tool
  const handleNormalization = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/data-cleaning/normalize-data");
      
      if (response.data.message === "No numerical data to normalize!") {
        toast.error(response.data.message);  // Show error toast
      } else {
        setToolsStatus({ ...toolsStatus, normalization: "Processed" });
        toast.success("Data normalization processed successfully!");  // Show success toast
      }
    } catch (error) {
      console.error("Error normalizing data", error);
      toast.error("No numeric Data to normalize");  // Show error toast for other errors
    }
  };
  
  

  // Function to handle encoding categorical variables
  const handleEncoding = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/data-cleaning/encode-categorical"); // Flask API
      setToolsStatus({ ...toolsStatus, encoding: "Processed" });
      toast.success("Categorical variables encoded successfully!");  // Show success toast
    } catch (error) {
      console.error("Error encoding categorical variables", error);
      toast.error("Failed to encode categorical variables.");  // Show error toast
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Data Cleaning Tools</h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Tools for handling missing values, normalizing data, and encoding
        categorical variables.
      </p>

      {/* Section for each tool */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tool 1: Handling Missing Values */}
        <div
          className="tool-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          onClick={handleMissingValues}
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Handling Missing Values</h3>
          <p className="text-gray-600">
            Fill or remove missing values in your dataset to ensure accuracy in analysis.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Status: {toolsStatus.missingValues}
          </div>
        </div>

        {/* Tool 2: Normalizing Data */}
        <div
          className="tool-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          onClick={handleNormalization}
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Normalizing Data</h3>
          <p className="text-gray-600">
            Scale your data to ensure that features are on a similar scale.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Status: {toolsStatus.normalization}
          </div>
        </div>

        {/* Tool 3: Encoding Categorical Variables */}
        <div
          className="tool-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          onClick={handleEncoding}
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Encoding Categorical Variables</h3>
          <p className="text-gray-600">
            Convert categorical data into numerical format for machine learning models.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Status: {toolsStatus.encoding}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCleaningTools;
