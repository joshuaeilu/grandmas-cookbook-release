'use client'
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [contentData, setContentData] = useState([]);

  return (
    <DataContext.Provider value={{ contentData, setContentData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);


