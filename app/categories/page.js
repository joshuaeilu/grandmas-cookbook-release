'use client'
import {useState, useEffect} from "react";
import useSWR from "swr";
import {useRouter} from 'next/navigation';

import MealCard from "../components/mealcard.js";

export default function Categories(){
    const router = useRouter();

    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error } = useSWR('https://www.themealdb.com/api/json/v2/9973533/categories.php', fetcher);
    const [categoryData, setCategoryData] = useState([]);

    function handleCardClick(category){
        router.push(`/categories/selected_all_categories/?category=${category}`, undefined, { shallow: true });
    }

    return (
        <div className="flex flex-wrap">
        {data?.categories.map((category) => (
          <div className="p-3" key={category.idCategory} onClick={()=> handleCardClick(category.strCategory)}>
            <MealCard
              imgSrc={category.strCategoryThumb}
              title={category.strCategory}
            />
          </div>
        ))}
      </div>
    )

}