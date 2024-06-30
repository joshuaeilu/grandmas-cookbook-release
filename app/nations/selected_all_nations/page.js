'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import {useData} from '../../helpers/data.js';
export default function SelectedAllNations(){
    const {contentData} = useData();
    const nation = new URLSearchParams(useSearchParams()).get('nation' || null);
    const NationData = contentData.filter(meal => meal.strArea === nation);
    return (
        <div>
            <Meals mData={NationData} />
        </div>
    )
}