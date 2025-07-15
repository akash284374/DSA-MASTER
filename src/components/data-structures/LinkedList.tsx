
import React, { useState } from 'react';
import { Plus, ArrowRight, Trash2, Search } from 'lucide-react';

const LinkedList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const append = () => {
    if (inputValue.trim()) {
      setList(prev => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  const prepend = () => {
    if (inputValue.trim()) {
      setList(prev => [inputValue.trim(), ...prev]);
      setInputValue('');
    }
  };

  const insertAt = () => {
    const index = parseInt(insertIndex);
    if (inputValue.trim() && !isNaN(index) && index >= 0 && index <= list.length) {
      const newList = [...list];
      newList.splice(index, 0, inputValue.trim());
      setList(newList);
      setInputValue('');
      setInsertIndex('');
    }
  };

  const removeAt = (index) => {
    setList(prev => prev.filter((_, i) => i !== index));
  };

  const search = () => {
    if (searchValue.trim()) {
      const index = list.findIndex(item => item === searchValue.trim());
      setSearchResult(index !== -1 ? `Found at index ${index}` : 'Not found');
    }
  };

  const clear = () => {
    setList([]);
    setSearchResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Linked List</h2>
        <p className="text-gray-400">Dynamic data structure with sequential access</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Add Operations */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add Elements</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={prepend}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
            >
              Prepend (Head)
            </button>
            <button
              onClick={append}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Append (Tail)
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
              type="text"
              placeholder="Enter value to search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={search}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Search
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
              onClick={clear}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-white/10 p-2 rounded">
                <div className="text-green-400 font-bold">O(1)</div>
                <div className="text-gray-400">Prepend</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-blue-400 font-bold">O(n)</div>
                <div className="text-gray-400">Append</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-purple-400 font-bold">O(n)</div>
                <div className="text-gray-400">Insert</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-red-400 font-bold">O(n)</div>
                <div className="text-gray-400">Search</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Linked List Visualization</h3>
        
        {list.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">🔗</div>
            <p>List is empty. Add some elements!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-center space-x-4 min-w-max">
              <div className="text-green-400 font-semibold">HEAD</div>
              <ArrowRight className="text-gray-400" />
              {list.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="relative group">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg min-w-24 text-center relative">
                      <div className="font-semibold">{item}</div>
                      <div className="text-xs text-blue-200 mt-1">Index: {index}</div>
                      <button
                        onClick={() => removeAt(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  {index < list.length - 1 && (
                    <ArrowRight className="text-gray-400 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
              <ArrowRight className="text-gray-400" />
              <div className="text-red-400 font-semibold">NULL</div>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{list.length}</div>
          <div className="text-gray-400">Length</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{list.length > 0 ? list[0] : 'N/A'}</div>
          <div className="text-gray-400">Head</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{list.length > 0 ? list[list.length - 1] : 'N/A'}</div>
          <div className="text-gray-400">Tail</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">Dynamic</div>
          <div className="text-gray-400">Size</div>
        </div>
      </div>
    </div>
  );
};

export default LinkedList;
