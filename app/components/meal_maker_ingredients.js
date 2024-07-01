'use client'
import { useEffect, useState, useCallback } from "react";
import IngredientElement from "./ingredient_element";
import MealCard from "./mealcard";
import useSWR from "swr";

export default function MealMakerIngredients() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: ingredientList, error } = useSWR('https://www.themealdb.com/api/json/v2/9973533/list.php?i=list', fetcher);
    const contentData = useData();
    const [usedIngredients, setUsedIngredients] = useState([]);
    const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
    const [allIngredientMeals, setAllIngredientMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [mealPreview, setMealPreview] = useState([]);
   
    useEffect(() => {
        if (ingredientList) {
            const allTheIngredientSuggestions = ingredientList.meals.map((item) => item.strIngredient);
            setIngredientSuggestions(allTheIngredientSuggestions);
        }
    }, [ingredientList]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const mockFetchIngredientSuggestions = (query) => {
        const allIngredientSuggestions = ingredientList?.meals.map((item) => item.strIngredient);
        return allIngredientSuggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    };

    const handleIngredientChange = useCallback((ingredient) => {
        setUsedIngredients(prevIngredients => {
            if (prevIngredients.includes(ingredient)) {
                return prevIngredients.filter(item => item !== ingredient);
            } else {
                return [...prevIngredients, ingredient];
            }
        });
    }, []);

    const filteredIngredientSuggestions = searchQuery
        ? mockFetchIngredientSuggestions(searchQuery)
        : ingredientSuggestions;

    const sortedIngredientSuggestions = filteredIngredientSuggestions.sort((a, b) => {
        const aChecked = usedIngredients.includes(a);
        const bChecked = usedIngredients.includes(b);
        if (aChecked === bChecked) {
            return 0;
        }
        return aChecked ? -1 : 1;
    });

    //getting ingredients and measures and putting them in an array
    const ingredients = [];
    const measures = [];
    Array.from({ length: 20 }, (_, i) => i + 1).forEach(i => {
      if (mealPreview[`strIngredient${i}`]) {
        ingredients.push(mealPreview[`strIngredient${i}`]);
        measures.push(mealPreview[`strMeasure${i}`]);
      }
    });

    function handleCardClick(mealClickedId){
        const matchedMeal = contentData.contentData.find(meal => meal.idMeal === mealClickedId);
       setMealPreview(matchedMeal || {});
    }

    return (
        <div className="flex">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meal Ingredients</h5>
                <form className="max-w-lg mx-auto">
                    <div className="flex">
                        <div className="relative w-full">
                            <input type="search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search ingredients..." onChange={handleSearchChange} required />
                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="mt-6">
                    {sortedIngredientSuggestions.map((ingredient) => (
                        <div key={ingredient}>
                            <IngredientElement
                                id={ingredient}
                                checked={usedIngredients.includes(ingredient)}
                                onIngredientsChange={handleIngredientChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meals With Ingredients</h5>
                <div className="flex" >
                    {allIngredientMeals.map((meal) => (
                        <div key={meal.idMeal} onClick={()=> handleCardClick(meal.idMeal)}>
                            <MealCard
                                imgSrc={meal.strMealThumb}
                                title={meal.strMeal}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
