import React from "react";

const PredictiveModeling = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        Predictive Modeling Sandbox
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Create and evaluate machine learning models with simple steps.
      </p>

      {/* Predictive Modeling Section */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-800">Create Models</h3>
        <p className="text-gray-600 mt-2">
          Use simple machine learning algorithms like linear regression, decision trees, and more.
        </p>
        <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
          Start Creating
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-800">Evaluate Performance</h3>
        <p className="text-gray-600 mt-2">
          Assess your models using metrics such as accuracy, R² score, and more.
        </p>
        <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
          Evaluate Now
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-800">View Results</h3>
        <p className="text-gray-600 mt-2">
          Visualize your model’s predictions and insights with interactive graphs and charts.
        </p>
        <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
          View Results
        </button>
      </div>
    </div>
  );
};

export default PredictiveModeling;
