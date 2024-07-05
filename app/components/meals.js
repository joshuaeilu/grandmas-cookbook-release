'use client'
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import SearchBar from "../components/searchbar.js";
import MealCard from "../components/mealcard.js";
import styles from '../page.module.css';
import {Suspense} from 'react';



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
                <div style={{padding:'0 1rem 1rem 1rem'}} >
        <SearchBar searchArray={mealData} onDataChange={handleDataChange}  />
        </div>
       
        <div style={{maxHeight:'100vh', overflowY:'auto', justifyContent:'space-evenly'}} className="flex flex-wrap " >

        {mealData.map((meal) => (
                        <button className={styles.mealButton}  onClick={() => handleClick(meal.idMeal)}>
                            
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