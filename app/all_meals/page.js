'use client'
import {useData} from '../helpers/data';
import Meals from '../components/meals';
export default function AllMeals() {
  

  
  const {setContentData, contentData} = useData();
  
    const fetchData = async () => {
      try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const meals = [];

        for (let letter of alphabet) {
          const response = await fetch(`https://www.themealdb.com/api/json/v2/9973533/search.php?f=${letter}`);
          const data = await response.json();
          if (data?.meals && data.meals.length > 0) {
            meals.push(...data.meals);
          }
        }

        setContentData(meals);
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