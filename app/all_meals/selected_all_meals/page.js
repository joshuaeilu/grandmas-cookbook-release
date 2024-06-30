'use client'
import { useEffect, useState } from "react";
import {useData} from '../../helpers/data';
import MealInfo from "../../components/mealinfo.js";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
export default function Page() {
    const {contentData} = useData();
    const [mealPreview, setMealPreview ] = useState([]);
    const searchParams = new URLSearchParams(useSearchParams());
    const mealId = searchParams.get('id');
    const meal = contentData.find(meal => meal.idMeal === mealId);
    
    
    useEffect(() => {
        if(meal) {
            setMealPreview(meal);
        }
    }, [meal]);
    //getting ingredients and measurements and putting them in an array
    const ingredients = [];
    const measures = [];

    Array.from({ length: 20 }, (_, i) => i + 1).forEach(i => {
        if (mealPreview[`strIngredient${i}`]) {
          ingredients.push(mealPreview[`strIngredient${i}`]);
          measures.push(mealPreview[`strMeasure${i}`]);
        }
      });

  return (
                    
                        <MealInfo onClose={() => setIsVisible(false)}
                        mealImage = {mealPreview.strMealThumb} mealTitle = {mealPreview.strMeal}   mealRegion = {mealPreview.strArea}  mealCategory = {mealPreview.strCategory} mealTags = {mealPreview.strTags} mealInstructions = {mealPreview.strInstructions}  mealIngredients = {ingredients} mealMeasures = {measures}
                         />


  );
}