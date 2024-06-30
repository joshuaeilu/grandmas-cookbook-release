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



// function fetchMealsByLetter(letter) {
//     const fetcher = (url) => fetch(url).then((res) => res.json());

//     const { data, error, isLoading } = useSWR(`https://www.themealdb.com/api/json/v2/9973533/search.php?f=${letter}`,fetcher);
//     return data.meals; // Assuming 'meals' is the array of results in the API response
// }

//  function fetchAllMeals() {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     const allMeals = [];

//     for (const letter of alphabet) {
//         const meals = fetchMealsByLetter(letter);
//         if (meals) {
//             allMeals.push(...meals);
//         }
//     }

//     setContentData(allMeals);
// }
// fetchAllMeals();