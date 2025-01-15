import React, { createContext, useState } from 'react';
import { CircularProgress } from '@mui/material';

export const DatasetContext = createContext();

const DatasetProvider = ({ children }) => {
  const [dataset, setDataset] = useState([]);
  const [column, setColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    dataset,
    setDataset,
    column,
    setColumn,
    isLoading,
    setIsLoading,
  };

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <div className="w-full text-center">
              <p className="text-lg text-gray-700 font-semibold mb-4">Loading, please wait...</p>
              <CircularProgress
                style={{
                  color: 'transparent',  // Make the default CircularProgress color transparent
                  background: 'linear-gradient(-200deg, #5D9FFF 0%, #acd6ff 48%, #6BBBFF 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DatasetContext.Provider value={value}>
      {children}
    </DatasetContext.Provider>
  );
};

export default DatasetProvider;
