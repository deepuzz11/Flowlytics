import React, { useContext, useState } from "react";
import { DatasetContext } from "../Context/DatasetContext";
import { Select, MenuItem } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VisualizationDashboard = () => {
  const { dataset, column } = useContext(DatasetContext); // Access dataset and columns from context
  const [selectedColumn, setSelectedColumn] = useState("");
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("bar"); // Default chart type is Bar

  // Function to handle column selection for charting
  const handleColumnChange = (e) => {
    if (dataset.length === 0) {
      toast.error("Please upload a dataset before selecting a column.");
      return;
    }

    const column = e.target.value;
    setSelectedColumn(column);

    // Create chart data from selected column
    const data = dataset.map((row, index) => ({
      name: `Data ${index + 1}`, // Use a simple index for the name or another meaningful label
      value: row[column], // Use the column data for the value
    }));
    setChartData(data);
  };

  // Function to handle chart type change
  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  // Function to render different chart types
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{ value: selectedColumn, position: "bottom", dy: 10 }}  // Adjust label position to prevent overlap
              tick={{ angle: 45, textAnchor: "middle", dy: 10 }}  // Rotate ticks for better readability
            />
            <YAxis label={{ value: "Values", angle: -90, position: "left" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={chartData}>
            <XAxis
              dataKey="name"
              label={{ value: selectedColumn, position: "bottom", dy: 10, dx:20,
               }}  // Adjust label position to prevent overlap
              tick={{ angle: 45, textAnchor: "middle", dy: 10 }}  // Rotate ticks for better readability
            />
            <YAxis label={{ angle: -90, position: "left" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        );
      case "radar":
        // Render Radar chart
        if (chartData.length > 0) {
          return (
            <RadarChart outerRadius={90} width={400} height={400} data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name={selectedColumn} dataKey="value" />
            </RadarChart>
          );
        } else {
          return <p>No data available for the Radar Chart</p>;
        }
      default:
        return null;
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Visualization Dashboard</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Create bar charts, scatter plots, and more using your datasets.
        </p>

        {/* Column Selection */}
        <div className="mb-8 flex justify-center">
          <Select
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
            className="w-64"
            disabled={dataset.length === 0} // Disable dropdown if no dataset
          >
            <MenuItem value="" disabled>Select a column for chart</MenuItem>
            {column.map((col, index) => (
              <MenuItem key={index} value={col}>{col}</MenuItem>
            ))}
          </Select>
        </div>

        {/* Chart Type Selection */}
        <div className="mb-8 flex justify-center">
          <Select
            value={chartType}
            onChange={handleChartTypeChange}
            className="w-64"
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="radar">Radar Chart</MenuItem>
          </Select>
        </div>

        {/* Display the Chart */}
        {chartData.length > 0 && (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default VisualizationDashboard;
