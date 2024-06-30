'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import {useData} from '../../helpers/data.js';
export default function SelectedAllCategories(){
    const {contentData} = useData();
    const category = new URLSearchParams(useSearchParams()).get('category' || null);
    const CategoryData = contentData.filter(meal => meal.strCategory === category);
    return (
        <div>
            <Meals mData={CategoryData} />
        </div>
    )
}