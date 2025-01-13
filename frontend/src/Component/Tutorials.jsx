import React from "react";

const Tutorials = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Data Science Tutorials</h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Learn concepts like regression, clustering, and decision trees step by
        step.
      </p>

      {/* Tutorials Section */}
      <div className="flex flex-col gap-6">
        {/* Tutorial Cards */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-800">Regression Tutorial</h3>
          <p className="text-gray-600 mt-2">
            Understand the fundamentals of regression analysis and its real-world
            applications.
          </p>
          <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
            Learn More
          </button>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-800">Clustering Tutorial</h3>
          <p className="text-gray-600 mt-2">
            Dive into clustering algorithms and learn how to group similar data points.
          </p>
          <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
            Learn More
          </button>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-800">Decision Trees Tutorial</h3>
          <p className="text-gray-600 mt-2">
            Learn how decision trees work and their applications in machine learning.
          </p>
          <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
