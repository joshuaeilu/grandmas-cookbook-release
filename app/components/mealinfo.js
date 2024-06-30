
import MealBio from './mealbio';
import IngredientsTable from './ingredients.js';
import Image from 'next/image';
import Instructions from './instructions.js';
import {useRouter} from 'next/navigation';
export default function MealInfo(props) {
    const router = useRouter();
    const handleClose = () => {
        router.back();
    };
return (
    <div >
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleClose}>Close
            </button>
        </div>
        <div className='flex' style={{justifyContent:'center'}}>
            
            <Image  className="h-auto w-auto rounded-lg p-3" src={props.mealImage} height={250} width={250} alt="image description" />
        </div>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white text-center">{props.mealTitle}</h1>
        <hr className="w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-white" />
        <div className="flex justify-center flex-wrap">
            <MealBio svg="/regions.svg" bio={props.mealRegion} />
            <MealBio svg="/categories.svg" bio={props.mealCategory} />
            {props.mealTags && <MealBio svg="/tags.svg" bio={props.mealTags} />}
        </div>
        <div>
            <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white text-center">Ingredients</h2>
            <IngredientsTable ingredientArray={props.mealIngredients} measureArray={props.mealMeasures}/>
           

            <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white text-center">Instructions</h2>
            <Instructions mealInstructions={props.mealInstructions} />
        </div>
    </div>
);
}