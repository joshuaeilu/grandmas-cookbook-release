'use client'
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import SearchBar from "../components/searchbar.js";
import MealCard from "../components/mealcard.js";



export default function Meals({mealData}) {
    const router = useRouter();

    const [meals, setMeals] = useState(mealData);



    useEffect(() => {
        if(mealData) {
            setMeals(mealData);
        }}, [mealData]);

        function handleClick(id){
            //Navigate to the meals info page
            router.push(`/all_meals/selected_all_meals/?id=${id}`, undefined, { shallow: true });
            
           
        }

        const handleDataChange = (newData) => { 
            setMealData(newData);
          };


        return (
            <div  style={{ display: 'flex', flexDirection: 'row'}}>
                <div>
        <SearchBar searchArray={meals} onDataChange={handleDataChange} style={{display:'fixed'}}  />
       
        <div className="flex flex-wrap " >

        {mealData.map((meal) => (
                        <button  onClick={() => handleClick(meal.idMeal)}>
                            <MealCard
                                key={meal.idMeal}
                                imgSrc={meal.strMealThumb}
                                title={meal.strMeal}
                            />
                        </button>
                    ))}

        </div>

    </div>

    
               
            </div>
            
        )






}