import { useState } from 'react';
import FilterBtn from '../components/filterbtn.js';
export default function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Simulating fetching suggestions
    const newSuggestions = value ? mockFetchSuggestions(value) : [];
    setSuggestions(newSuggestions.slice(0, 5));
  };

  // Mock function to simulate fetching suggestions
  const mockFetchSuggestions = (query) => {
    const allSuggestions = props.searchArray.map((item) => item.strMeal);
      
    return allSuggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  };

  const handleDataChanges = (newData) => {
    props.onDataChange(newData);
  };

  function handleClickSuggestion(suggestion) {
    setSearchTerm(suggestion);
    handleDataChanges(props.searchArray.filter(item => item.strMeal.toLowerCase().includes(suggestion.toLowerCase())));
    setSuggestions([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDataChanges(props.searchArray.filter(item => item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())));
    setSuggestions([]);
    };
    return (
      
      <div style={{display:'flex', justifyContent:'center'}}>
 <div className="w-full max-w-lg mt-2 relative">
      <form onSubmit={handleSubmit} >
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4  text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Meal Recipes..."
            value={searchTerm}
            onChange={handleSearchChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => handleClickSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  


    <FilterBtn filterInfo={props.searchArray} filterDataChange={handleDataChanges}/>
                                            
        </div>
    )
}