'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import mealData from '@/app/helpers/data';
export default function SelectedAllCategories(){
    const category = new URLSearchParams(useSearchParams()).get('category');
    const CategoryData = mealData.filter(meal => meal.strCategory === category);
    return (
        <div>
            <Meals mData={CategoryData} />
        </div>
    )
}