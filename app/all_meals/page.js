'use client'
import {useData} from '../helpers/data';
import Meals from '../components/meals';
export default function AllMeals() {
  

  
  
    const fetchData = async () => {
      try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';

        for (let letter of alphabet) {
          const response = await fetch(`https://www.themealdb.com/api/json/v2/9973533/search.php?f=${letter}`);
          const data = await response.json();
          if (data?.meals && data.meals.length > 0) {
            meals.push(...data.meals);
          }
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

  return (
    <div>
      <Meals mData={contentData}  />
    </div>
  );
}