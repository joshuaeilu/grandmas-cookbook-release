'use client'
import Meals from '../../components/meals';
import {useSearchParams} from 'next/navigation';
import {useData} from '../../helpers/data.js';
import {Suspense} from 'react';
export default function SelectedAllNations(){
    const {contentData} = useData();
    const nation = new URLSearchParams(useSearchParams()).get('nation');
    const NationData = contentData.filter(meal => meal.strArea === nation);
    return (
        <div>
            <Suspense>
            <Meals mData={NationData} />
            </Suspense>
        </div>
    )
}