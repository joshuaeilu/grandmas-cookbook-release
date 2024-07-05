'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import MealInfo from '@/app/components/mealinfo';
import mealData from '@/app/helpers/data';
export default function SelectedAllCategories(){
    const searchParams = new URLSearchParams(useSearchParams());
    const mealId = searchParams.get('id');
    const mealPreview = mealData.find(meal => meal.idMeal === mealId);

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
        <div>
            <MealInfo 
                        mealYoutube = {mealPreview.strYoutube} mealImage = {mealPreview.strMealThumb} mealTitle = {mealPreview.strMeal}   mealRegion = {mealPreview.strArea}  mealCategory = {mealPreview.strCategory} mealTags = {mealPreview.strTags} mealInstructions = {mealPreview.strInstructions}  mealIngredients = {ingredients} mealMeasures = {measures}
                         />
        </div>
    )
}