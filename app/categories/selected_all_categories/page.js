'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import {useData} from '../../helpers/data.js';
import { Suspense } from 'react';
export default function SelectedAllCategories(){
    const {contentData} = useData();
    const category = new URLSearchParams(useSearchParams()).get('category');
    const CategoryData = contentData.filter(meal => meal.strCategory === category);
    return (
        <div>
            <Suspense>
            <Meals mData={CategoryData} />
            </Suspense>
        </div>
    )
}