import React, { useState } from "react";
import axios from 'axios';
import Papa from 'papaparse'; // Add this import for CSV parsing
import { toast } from 'react-toastify'; // Add Toastify for notifications

const PredictiveModeling = () => {
  const [modelType, setModelType] = useState("");
  const [dataset, setDataset] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [yTest, setYTest] = useState([]);  // State to store y_test
  const [yPred, setYPred] = useState([]);  // State to store y_pred

  const handleModelSelection = (e) => {
    setModelType(e.target.value);
  };

  const handleDatasetUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Parse the CSV file using PapaParse (adjust the config as needed)
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data;
          
          // Convert label strings to numbers
          const y_test = data.map(row => {
            const label = row['label'];
            const numericLabel = parseFloat(label);
            return isNaN(numericLabel) ? 0 : numericLabel;  // Default to 0 if not numeric
          });
  
          const X_test = data.map(row => Object.values(row).slice(0, -1));
  
          // Check for NaN in y_test
          const hasNaNInYTest = y_test.some(value => isNaN(value));
          if (hasNaNInYTest) {
            console.error("yTest contains NaN values");
            return;
          }
  
          setYTest(y_test);
          setDataset(X_test);
        },
        header: true,
      });
    }
  };
  

  const handleModelEvaluation = async () => {
    // Ensure y_test and y_pred are available
    if (!yTest || yTest.length === 0 || !modelType || !dataset) {
      console.error("Missing data for evaluation");
      return;
    }
  
    // Simulate model prediction (this would normally be done by a model, 
    // but for the sake of the example, we'll simulate predictions).
    const y_pred = dataset.map(() => Math.random()); // Replace with actual model prediction logic
  
    setYPred(y_pred); // Set the predicted values
  
    console.log("y_test:", yTest);
    console.log("y_pred:", y_pred);
  
    // Check if the arrays are empty
    if (yTest.length === 0 || y_pred.length === 0) {
      console.error("y_test or y_pred is empty");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/evaluate", {
        y_test: yTest,
        y_pred: y_pred,
        model_type: modelType,  // example: 'linear_regression'
      });
  
      setEvaluationResults(response.data.metrics);
      toast.success("Model evaluated successfully!");  // Success notification
  
    } catch (error) {
      console.error("Error during model evaluation:", error.response?.data || error.message);
      
      // Check for specific error response from the backend (e.g., invalid model type)
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        
        if (errorMessage.includes('Invalid model type')) {
          toast.error("Invalid model type selected. Please choose from 'linear_regression', 'decision_tree_regressor', or 'decision_tree_classifier'.");
        } else {
          toast.error("An error occurred during model evaluation.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
 
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        Predictive Modeling Sandbox
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Create and evaluate machine learning models with simple steps.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-800">Create Models</h3>
        <p className="text-gray-600 mt-2">
          Choose a model type (e.g., linear regression, decision trees).
        </p>
        <select
          className="mt-4 p-2 border rounded-lg"
          onChange={handleModelSelection}
          value={modelType}
        >
          <option value="">Select Model</option>
          <option value="linear_regression">Linear Regression</option>
          <option value="decision_tree_regressor">Decision Tree</option>
        </select>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-800">Upload Dataset</h3>
        <p className="text-gray-600 mt-2">Upload a dataset to train the model.</p>
        <input
          type="file"
          onChange={handleDatasetUpload}
          className="mt-4"
        />
        {/* Remove dataset display */}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-800">Evaluate Performance</h3>
        <p className="text-gray-600 mt-2">
          After training, evaluate your model using various metrics.
        </p>
        <button
          className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
          onClick={handleModelEvaluation}
          disabled={!modelType || !dataset}
        >
          Evaluate Now
        </button>

        {evaluationResults && (
          <div className="mt-4">
            <h4 className="font-semibold">Evaluation Results</h4>
            <p>Accuracy: {evaluationResults.Accuracy}</p>
            <p>R² Score: {evaluationResults.R2}</p>
            <p>Mean Absolute Error: {evaluationResults['Mean Absolute Error']}</p>
            <p>Mean Squared Error: {evaluationResults['Mean Squared Error']}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictiveModeling;
