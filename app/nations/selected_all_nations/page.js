'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import {useData} from '../../helpers/data.js';
export default function Page(){
    const {contentData} = useData();
    const nation = new URLSearchParams(useSearchParams()).get('nation');
    const NationData = contentData.filter(meal => meal.strArea === nation);
    return (
        <div>
            <Meals mData={NationData} />
        </div>
    )
}