'use client'
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(`/api/BD/searchproduct?search=${e.target.value}`);

        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-96">      
    <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="search-input border rounded-lg p-2 w-full"
      />
      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-lg mt-2 shadow-lg">
          <div className="p-4">
            <h3 className="font-bold text-lg">Products</h3>
            {results.map((product: any) => (
              <div key={product._id} className="flex items-center space-x-4 py-2">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">Description courte du produit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;