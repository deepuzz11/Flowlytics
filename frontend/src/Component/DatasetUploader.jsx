import React, { useState } from "react";

const DatasetUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    alert("File uploaded successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-800">Upload Dataset</h2>
      
      {/* File Upload Section */}
      <div className="flex flex-col items-center">
        <label 
          htmlFor="file-upload" 
          className="mb-4 text-lg  cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Choose CSV File
        </label>
        
        <input 
          id="file-upload"
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
          className="hidden"
        />
      </div>

      {/* Display Uploaded File */}
      {file && (
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-gray-800">Uploaded File: <span className="text-blue-600">{file.name}</span></p>
        </div>
      )}
    </div>
  );
};

export default DatasetUploader;
