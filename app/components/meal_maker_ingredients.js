'use client'
import { useEffect, useState, useCallback } from "react";
import {useRouter} from 'next/navigation';
import IngredientElement from "./ingredient_element";
import MealCard from "./mealcard";
import { useData } from "../helpers/data.js";
import useSWR from "swr";

export default function MealMakerIngredients() {
    const router = useRouter();
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

    useEffect(() => {
        if (contentData.contentData) {
            filterMealsByIngredients();
        }
    }, [usedIngredients, contentData.contentData]);

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

    const filterMealsByIngredients = () => {
        if (!usedIngredients.length) {
            setAllIngredientMeals([]);
            return;
        }

        const filteredMeals = contentData.contentData.filter(meal => {
            const mealIngredients = Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`]?.toLowerCase() || '').filter(Boolean);
            return usedIngredients.every(ingredient => 
                mealIngredients.some(mealIng => mealIng.includes(ingredient.toLowerCase()))
            );
        });

        setAllIngredientMeals(filteredMeals);
    };

    const ingredients = [];
    const measures = [];
    Array.from({ length: 20 }, (_, i) => i + 1).forEach(i => {
      if (mealPreview[`strIngredient${i}`]) {
        ingredients.push(mealPreview[`strIngredient${i}`]);
        measures.push(mealPreview[`strMeasure${i}`]);
      }
    });

    function handleCardClick(mealClickedId){
        //Navigate to the meals info page
        router.push(`../all_meals/selected_all_meals/?id=${mealClickedId}`, undefined, { shallow: true });
    }

    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-4 p-4">
            <div className="w-full md:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meal Ingredients</h5>
                <form className="w-full mb-4">
                    <div className="relative">
                        <input 
                            type="search" 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                            placeholder="Search ingredients..." 
                            onChange={handleSearchChange} 
                            required 
                        />
                        <button 
                            type="submit" 
                            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>
                <div className="mt-6 overflow-y-auto" style={{ maxHeight: '300px' }}>
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
            <div className="w-full md:w-2/3 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meals With Ingredients</h5>
                <div className="flex flex-wrap gap-4">
                    {allIngredientMeals.map((meal) => (
                        <div className=" sm:w-1/2 lg:w-1/3 p-2" key={meal.idMeal} onClick={() => handleCardClick(meal.idMeal)}>
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
