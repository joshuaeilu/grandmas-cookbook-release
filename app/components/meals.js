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


          

        return (
            <div  style={{ display: 'flex', flexDirection: 'row', maxHeight:'100vh', overflowY:'auto'}}>
                <div>
        
        <div style={{position:'fixed',backgroundColor:'white'}} className='w-full '>
        <SearchBar searchArray={meals} onDataChange={handleDataChange}  />
        </div>
       
        <div style={{marginTop:'4rem'}} className="flex flex-wrap " >

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
            
        )






}