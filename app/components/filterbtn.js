import React, { useState, useEffect, useRef } from 'react';

export default function FilterBtn(props) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [region, setRegion] = useState('all');
    const [category, setCategory] = useState('all');
    const [filterRegion, setFilterRegion] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const filterItems = (items, region, category) => {
        return items.filter(item => {
            const matchRegion = region === 'all' || item.strArea === region;
            const matchCategory = category === 'all' || item.strCategory === category;
            return matchRegion && matchCategory;
        });
    };

    useEffect(() => {
       
        if(props.filterInfo){
            const uniqueRegions = [...new Set(props.filterInfo.map(item => item.strArea))];
            const uniquecategories = [...new Set(props.filterInfo.map(item => item.strCategory))];
            setFilterRegion(uniqueRegions);
            setFilterCategory(uniquecategories);
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]); 


    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown} 
                className="m-2.5 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 shadow-md"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                    <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/>
                </svg>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Filter Options</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="regionSelect" className="block mb-2 text-sm font-medium text-gray-700">Select Region:</label>
                                <select id="regionSelect" value={region} onChange={handleRegionChange} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                                    <option value="all">All Regions</option>
                                    {filterRegion.map((region, index) => (
                                        <option key={index} value={region}>{region}</option>
                                    ))}
                                   
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categorySelect" className="block mb-2 text-sm font-medium text-gray-700">Select Category:</label>
                                <select id="categorySelect" value={category} onChange={handleCategoryChange} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                                    <option value="all">All Categories</option>
                                    {filterCategory.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                    
                                </select>
                            </div>
                            <button 
                                type="button" 
                                className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 shadow-sm"
                                onClick={() => { 
                                    // Implement your filter logic here
                                    toggleDropdown();
                                    props.filterDataChange(filterItems(props.filterInfo, region, category));
                                }}>
                                Apply Filters
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
