'use client'
import useSWR from 'swr';
import {useData} from '../helpers/data';
import { useEffect } from 'react';
import Meals from '../components/meals';
export default function AllMeals() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error } = useSWR('https://www.themealdb.com/api/json/v2/9973533/search.php?f=b', fetcher);

  const {setContentData, contentData} = useData();
  
  useEffect(() => {
    if (data?.meals && data.meals.length > 0) {
      setContentData(data.meals);
    }
  }, [data]);

  return (
    <div>
      <Meals mData={contentData}  />
    </div>
  );
}