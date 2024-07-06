'use client'
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import SearchBar from "../components/searchbar.js";
import MealCard from "../components/mealcard.js";
import styles from '../page.module.css';
import CardSkeleton from './card_skeleton.js';
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
            <div className=' absolute md:relative mt-10 pt-10 md:mt-0 md:pt-0'  style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
                <div style={{padding:'0 1rem 1rem 1rem'}}  >
        <SearchBar searchArray={mealData} onDataChange={handleDataChange}  />
        </div>
       
        <div style={{maxHeight:'90vh', overflowY:'auto', justifyContent:'space-evenly'}} className="flex flex-wrap " >

        {mealData.map((meal) => (
                        <button className={styles.mealButton}  onClick={() => handleClick(meal.idMeal)}>
                           <Suspense fallback={<CardSkeleton/>}>
                           <MealCard
                                key={meal.idMeal}
                                imgSrc={meal.strMealThumb}
                                title={meal.strMeal.substring(0, 23)}
                            />
                            </Suspense>
                        </button>
                    ))}

        </div>


    
               
            </div>
            
        )






}