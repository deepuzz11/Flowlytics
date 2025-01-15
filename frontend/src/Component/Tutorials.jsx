import React, { useState } from "react";
import MediaCard from "./card";

const Tutorials = () => {
  const [selectedTutorial, setSelectedTutorial] = useState("");

  const handleTutorialSelection = (tutorial) => {
    setSelectedTutorial(tutorial);
  };

  const renderTutorialCard = () => {
    switch (selectedTutorial) {
      case "Linear Regression":
        return (
          <MediaCard
            label="Regression Tutorial"
            description="Understand the fundamentals of regression analysis and its real-world applications."
            videoUrl={`https://www.youtube.com/embed/zUQr6HAAKp4`}
            learnMore="https://www.youtube.com/@GateSmashers/search?query=linear%20regression"
          
      
/>
        );
      case "K-mean Clustering":
        return (
          <MediaCard
            label="K-mean Clustering Tutorial"
            description="Learn about clustering algorithms and how to group similar data points."
            videoUrl="https://www.youtube.com/embed/VIDEO_ID_FOR_K_MEAN"
            learnMore = "https://www.youtube.com/@GateSmashers/search?query=clustering"
          />
        );
      case "Decision Trees":
        return (
          <MediaCard
            label="Decision Trees Tutorial"
            description="Learn how decision trees work and their applications in machine learning."
            videoUrl='https://www.youtube.com/embed/mvveVcbHynE'
            learnMore="https://www.youtube.com/@GateSmashers/search?query=Decision%20Trees"
          />
        );
      default:
        return (
          <div className="text-center text-gray-600">
            <p>Select a tutorial to view</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        Data Science Tutorials
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Learn concepts like regression, clustering, and decision trees step by
        step.
      </p>

      {/* Tutorial Selection */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          className="p-4 bg-blue-500 text-white rounded-lg text-bold"
          onClick={() => handleTutorialSelection("Linear Regression")}
        >
          Linear Regression Tutorial
        </button>
        <button
          className="p-4 bg-sky-500 text-white rounded-lg text-bold"
          onClick={() => handleTutorialSelection("K-mean Clustering")}
        >
          K-mean Clustering Tutorial
        </button>
        <button
          className="p-4 bg-black text-white rounded-lg text-bold"
          onClick={() => handleTutorialSelection("Decision Trees")}
        >
          Decision Trees Tutorial
        </button>
      </div>

      {/* Display the selected tutorial */}
      <div className="flex justify-center mb-8">{renderTutorialCard()}</div>
    </div>
  );
};

export default Tutorials;
