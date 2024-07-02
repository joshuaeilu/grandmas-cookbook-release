'use client'
import { Suspense, useEffect, useState } from "react";
import MealInfo from "../../components/mealinfo.js";
import mealData from "@/app/helpers/data.js";
import { useSearchParams} from 'next/navigation';
export default function SelectedAllMeals() {
    const [mealPreview, setMealPreview ] = useState([]);
    const searchParams = new URLSearchParams(useSearchParams());
    const mealId = searchParams.get('id');
    const meal = mealData.find(meal => meal.idMeal === mealId);
    
    
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
    <Suspense key={`${searchParams.get('id')}`} fallback={<div>Loading...</div>}>
    
                        <MealInfo onClose={() => setIsVisible(false)}
                        mealYoutube = {mealPreview.strYoutube} mealImage = {mealPreview.strMealThumb} mealTitle = {mealPreview.strMeal}   mealRegion = {mealPreview.strArea}  mealCategory = {mealPreview.strCategory} mealTags = {mealPreview.strTags} mealInstructions = {mealPreview.strInstructions}  mealIngredients = {ingredients} mealMeasures = {measures}
                         />
                         </Suspense>

  );
}