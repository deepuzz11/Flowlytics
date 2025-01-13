import React from "react";

const DataCleaningTools = () => {
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
        <div className="tool-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Handling Missing Values</h3>
          <p className="text-gray-600">
            Fill or remove missing values in your dataset to ensure accuracy in analysis.
          </p>
        </div>

        {/* Tool 2: Normalizing Data */}
        <div className="tool-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Normalizing Data</h3>
          <p className="text-gray-600">
            Scale your data to ensure that features are on a similar scale.
          </p>
        </div>

        {/* Tool 3: Encoding Categorical Variables */}
        <div className="tool-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Encoding Categorical Variables</h3>
          <p className="text-gray-600">
            Convert categorical data into numerical format for machine learning models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataCleaningTools;
