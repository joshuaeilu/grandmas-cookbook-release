'use client'
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import SearchBar from "../components/searchbar.js";
import MealCard from "../components/mealcard.js";



export default function Meals({mData}) {
    const router = useRouter();

    const [mealData, setMealData] = useState(mData);

    
    const handleDataChange = (newData) => { 
        setMealData(newData);
        
      };
    useEffect(() => {
        if(mData) {
            setMealData(mData);
        }}, [mData]);

        function handleClick(id){
            //Navigate to the meals info page
            router.push(`/all_meals/selected_all_meals/?id=${id}`, undefined, { shallow: true });
            
           
        }


          

        return (
            <div  style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{position:'fixed', width:'80%',backgroundColor:'white', zIndex:'30'}}>
        <SearchBar searchArray={mealData} onDataChange={handleDataChange}  />
        </div>
       
        <div style={{marginTop:'4.3rem',maxHeight:'100vh', overflowY:'auto'}} className="flex flex-wrap " >

        {mealData.map((meal) => (
                        <button className='p-2'  onClick={() => handleClick(meal.idMeal)}>
                            <MealCard
                                key={meal.idMeal}
                                imgSrc={meal.strMealThumb}
                                title={meal.strMeal.substring(0, 23)}
                            />
                        </button>
                    ))}

        </div>


    
               
            </div>
            
        )






}