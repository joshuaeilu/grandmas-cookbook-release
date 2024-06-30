import {useState} from "react";
export default function Instructions(props) {

    const instructions = props.mealInstructions;
    const [activeTab, setActiveTab] = useState('checklist');

    function handleClick(tab) {
        setActiveTab(tab);
    }

    //splitting the instructions into an array(checklist)
    function splitIntoChecklist(instructions) {
         // Check if instructions is defined and is a string
    if (typeof instructions === 'string') {
        return instructions.split('.').filter(instruction => instruction.trim() !== '');
    }
    // Return an empty array if instructions is undefined or not a string
    return [];
    }
    const checklistInstructions = splitIntoChecklist(instructions);
    let useClassName1 = activeTab === 'summary' ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500" : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
    let useClassName2 = activeTab === 'checklist' ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500" : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
return (
    <div>
        <ul className="flex mt-3 mb-3 flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-center">
    <li className="me-2">
        <a href="#" aria-current="page" onClick={() =>handleClick('checklist')} className={useClassName2}>Checklist</a>
    </li>
    <li className="me-2">
        <a href="#" onClick={() =>handleClick('summary')} className={useClassName1}>Summary</a>
    </li>
    
</ul>
{
    activeTab === 'summary' && (
        <div>
            <p>{instructions}</p>
            
        </div>
    )
}
{
    activeTab === 'checklist' && (
        <div>

{
    checklistInstructions.map((instruction, index) => (
        <div key={index} className="flex items-center mb-4">
            <input id={`default-checkbox${index}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            
            <label htmlFor={`default-checkbox${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{instruction}</label>
        </div>
    ))
}

        </div>

        
    )
}
