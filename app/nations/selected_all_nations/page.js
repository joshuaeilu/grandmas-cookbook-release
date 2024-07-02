'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import mealData from '@/app/helpers/data';
export default function SelectedAllNations(){
    const nation = new URLSearchParams(useSearchParams()).get('nation');
    const NationData = mealData.filter(meal => meal.strArea === nation);
    return (
        <div>
            <Meals mData={NationData} />
        </div>
    )
}