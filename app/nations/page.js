'use client'
import {useState} from "react";
import {useRouter} from 'next/navigation';
import MealCard from "../components/mealcard.js";

export default function Nations(){
    const router = useRouter();
    const countryIcons = [
        { strArea: "American", code: "us" },
        { strArea: "British", code: "gb" },
        { strArea: "Canadian", code: "ca" },
        { strArea: "Chinese", code: "cn" },
        { strArea: "Croatian", code: "hr" },
        { strArea: "Dutch", code: "nl" },
        { strArea: "Egyptian", code: "eg" },
        { strArea: "Filipino", code: "ph" },
        { strArea: "French", code: "fr" },
        { strArea: "Greek", code: "gr" },
        { strArea: "Indian", code: "in" },
        { strArea: "Irish", code: "ie" },
        { strArea: "Italian", code: "it" },
        { strArea: "Jamaican", code: "jm" },
        { strArea: "Japanese", code: "jp" },
        { strArea: "Kenyan", code: "ke" },
        { strArea: "Malaysian", code: "my" },
        { strArea: "Mexican", code: "mx" },
        { strArea: "Moroccan", code: "ma" },
        { strArea: "Polish", code: "pl" },
        { strArea: "Portuguese", code: "pt" },
        { strArea: "Russian", code: "ru" },
        { strArea: "Spanish", code: "es" },
        { strArea: "Thai", code: "th" },
        { strArea: "Tunisian", code: "tn" },
        { strArea: "Turkish", code: "tr" },
        { strArea: "Ukrainian", code: "ua" },
        { strArea: "Unknown", code: "unknown" },
        { strArea: "Vietnamese", code: "vn" }
    ];

    function handleClick(clickedNation){
        router.push(`/nations/selected_all_nations/?nation=${clickedNation}`, undefined, { shallow: true });
    }

    return (
        <div className="pt-10 md:pt-5">
            <div className="pt-10 md:pt-0">
            <h1 style={{fontWeight:'500'}} className="text-3xl text-center">Nations</h1>
            <div className="flex flex-wrap justify-center">
        {countryIcons.map((country) => (
                            <div className="p-2"  onClick={() => handleClick(country.strArea)}>
                                <MealCard
                                    imgSrc={`https://flagsapi.com/${(country.code).toUpperCase()}/flat/64.png`}
                                    title={country.strArea}
                                />
                            </div>
                        ))}
    </div>
        </div>
        </div>
    )

}