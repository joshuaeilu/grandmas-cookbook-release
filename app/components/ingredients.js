export default function IngredientsTable(props) {
    
return (


<div className="mt-3  overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th style={{fontSize:'18px'}} scope="col" className="px-3 py-3">
                    Image
                </th>
                <th style={{fontSize:'18px'}} scope="col" className="px-3 py-3">
                    Ingredients
                </th>
                <th style={{fontSize:'18px'}} scope="col" className="px-3 py-3">
                    Measure
                </th>
                
            </tr>
        </thead>
        <tbody>
            {
                props.ingredientArray.map((ingredient, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`} alt={ingredient} className="h-10 w-10 rounded-full" />
                        </th>
                        <td style={{fontSize:'16px'}} className="px-3 py-4">
                            {ingredient}
                        </td>
                        <td style={{fontSize:'16px'}} className="px-3 py-4">
                            {props.measureArray[index]}
                        </td>
                        
                    </tr>
                ))
            }
            
        </tbody>
    </table>
</div>

)
}