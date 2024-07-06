import {useState} from 'react';
export default function IngredientElement(props) {
   
  
return (
    
    <div class="flex items-center mb-4 z-100 ps-2">
    <input id={props.id}type="checkbox" checked={props.checked} value="" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => props.onIngredientsChange(props.id)}/>
    <label style={{fontSize:'16px'}} for={props.id} class="ms-2 w-full  text-gray-900 dark:text-gray-300">{props.id}</label>
</div>
)
}