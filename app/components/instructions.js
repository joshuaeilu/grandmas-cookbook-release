import { useState } from "react";

export default function Instructions(props) {
    const instructions = props.mealInstructions;
    const [activeTab, setActiveTab] = useState('checklist');

    function handleClick(tab, event) {
        event.preventDefault(); // This prevents the default anchor behavior
        setActiveTab(tab);
    }

    // Splitting the instructions into an array (checklist)
    function splitIntoChecklist(instructions) {
        // Check if instructions is defined and is a string
        if (typeof instructions === 'string') {
            return instructions.split('.').filter(instruction => instruction.trim() !== '');
        }
        // Return an empty array if instructions is undefined or not a string
        return [];
    }

    const checklistInstructions = splitIntoChecklist(instructions);
    let useClassName1 = activeTab === 'summary' ? "inline-block p-4 text-red-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-red-500" : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
    let useClassName2 = activeTab === 'checklist' ? "inline-block p-4 text-red-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-red-500" : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

    return (
        <div className="">
            <ul className="flex mt-3 mb-3 flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-center">
                <li className="me-2">
                    <a style={{fontSize:'18px'}} href="#" aria-current="page" onClick={(e) => handleClick('checklist', e)} className={useClassName2}>Checklist</a>
                </li>
                <li className="me-2">
                    <a style={{fontSize:'18px'}} href="#" onClick={(e) => handleClick('summary', e)} className={useClassName1}>Summary</a>
                </li>
            </ul>
            {activeTab === 'summary' && (
                <div className="flex justify-center">
                    <p style={{lineHeight:'1.6', padding:'5px 15px', width:'80%'}}>{instructions}</p>
                </div>
            )}
            {activeTab === 'checklist' && (
                <div>
                    {checklistInstructions.map((instruction, index) => (
                        <div key={index} className="flex items-center m-4">
                            <input id={`default-checkbox${index}`} type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label style={{fontSize:'16px'}} htmlFor={`default-checkbox${index}`} className="ms-2  text-gray-900 dark:text-gray-300">{instruction}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
