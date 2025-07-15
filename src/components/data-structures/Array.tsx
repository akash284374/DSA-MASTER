
import React, { useState } from 'react';
import { Plus, Search, ArrowRight, Shuffle, Trash2 } from 'lucide-react';

const Array = () => {
  const [array, setArray] = useState([10, 25, 5, 18, 42, 8, 33]);
  const [inputValue, setInputValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const append = () => {
    if (inputValue.trim()) {
      const value = parseInt(inputValue);
      if (!isNaN(value)) {
        setArray(prev => [...prev, value]);
        setInputValue('');
      }
    }
  };

  const insertAt = () => {
    const index = parseInt(insertIndex);
    const value = parseInt(inputValue);
    if (!isNaN(value) && !isNaN(index) && index >= 0 && index <= array.length) {
      const newArray = [...array];
      newArray.splice(index, 0, value);
      setArray(newArray);
      setInputValue('');
      setInsertIndex('');
    }
  };

  const removeAt = (index) => {
    setArray(prev => prev.filter((_, i) => i !== index));
    setHighlightedIndex(-1);
  };

  const search = () => {
    if (searchValue.trim()) {
      const value = parseInt(searchValue);
      if (!isNaN(value)) {
        const index = array.findIndex(item => item === value);
        setSearchResult(index !== -1 ? `Found at index ${index}` : 'Not found');
        setHighlightedIndex(index);
      }
    }
  };

  const shuffle = () => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setArray(newArray);
    setHighlightedIndex(-1);
  };

  const clear = () => {
    setArray([]);
    setSearchResult(null);
    setHighlightedIndex(-1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Array Data Structure</h2>
        <p className="text-gray-400">Contiguous memory allocation with O(1) access time</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Add Operations */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add Elements</h3>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={append}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Append
            </button>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Index"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                className="w-20 bg-gray-700 text-white px-2 py-2 rounded border border-gray-600"
              />
              <button
                onClick={insertAt}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
              >
                Insert At
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-400" />
            Search
          </h3>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter value to search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={search}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Linear Search
            </button>
            {searchResult && (
              <div className={`text-center p-3 rounded-lg ${
                searchResult.includes('Found') 
                  ? 'bg-green-600/20 text-green-300' 
                  : 'bg-red-600/20 text-red-300'
              }`}>
                {searchResult}
              </div>
            )}
          </div>
        </div>

        {/* Operations */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Operations</h3>
          <div className="space-y-4">
            <button
              onClick={shuffle}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Shuffle className="h-4 w-4" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={clear}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-white/10 p-2 rounded">
                <div className="text-green-400 font-bold">O(1)</div>
                <div className="text-gray-400">Access</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-blue-400 font-bold">O(n)</div>
                <div className="text-gray-400">Search</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-purple-400 font-bold">O(n)</div>
                <div className="text-gray-400">Insert</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-red-400 font-bold">O(n)</div>
                <div className="text-gray-400">Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Array Visualization</h3>
        
        {array.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">📊</div>
            <p>Array is empty. Add some elements!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 overflow-x-auto">
              {array.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-400 mb-1">Index: {index}</div>
                  <div 
                    className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 relative group ${
                      highlightedIndex === index 
                        ? 'bg-green-500 border-green-400 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white'
                    }`}
                  >
                    <span className="font-bold">{item}</span>
                    <button
                      onClick={() => removeAt(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>Memory addresses: Contiguous</span>
              <ArrowRight className="h-4 w-4" />
              <span>Random access: O(1)</span>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{array.length}</div>
          <div className="text-gray-400">Length</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{array.length > 0 ? Math.max(...array) : 'N/A'}</div>
          <div className="text-gray-400">Max</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{array.length > 0 ? Math.min(...array) : 'N/A'}</div>
          <div className="text-gray-400">Min</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">Static</div>
          <div className="text-gray-400">Memory</div>
        </div>
      </div>
    </div>
  );
};

export default Array;
