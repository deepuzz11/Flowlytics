import React, { createContext, useState } from 'react';

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
  if(isLoading)
  {
    return<><h1>....</h1></>
  }

  return (
    <DatasetContext.Provider value={value}>
      {children}
    </DatasetContext.Provider>
  );
};

export default DatasetProvider;
