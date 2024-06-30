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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDataChanges(props.searchArray.filter(item => item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())));
    setSuggestions([]);
    };
    return (
      
        <div style={{display:'flex', justifyContent:'center'}}>
 <div className="w-full max-w-lg mt-2 relative">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            value={searchTerm}
            onChange={handleSearchChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setSearchTerm(suggestion)}
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