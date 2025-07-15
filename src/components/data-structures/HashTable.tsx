
import React, { useState } from 'react';
import { Plus, Search, Trash2, Hash } from 'lucide-react';

const HashTable = () => {
  const [hashTable, setHashTable] = useState(Array(10).fill(null).map(() => []));
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const hashFunction = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % 10;
    }
    return hash;
  };

  const insert = () => {
    if (key.trim() && value.trim()) {
      const index = hashFunction(key);
      const newHashTable = [...hashTable];
      
      // Check if key already exists in the bucket
      const existingIndex = newHashTable[index].findIndex(item => item.key === key);
      if (existingIndex !== -1) {
        newHashTable[index][existingIndex] = { key, value };
      } else {
        newHashTable[index].push({ key, value });
      }
      
      setHashTable(newHashTable);
      setKey('');
      setValue('');
    }
  };

  const search = () => {
    if (searchKey.trim()) {
      const index = hashFunction(searchKey);
      const bucket = hashTable[index];
      const found = bucket.find(item => item.key === searchKey);
      setSearchResult(found ? found.value : 'Not found');
    }
  };

  const remove = (bucketIndex, itemIndex) => {
    const newHashTable = [...hashTable];
    newHashTable[bucketIndex].splice(itemIndex, 1);
    setHashTable(newHashTable);
  };

  const clear = () => {
    setHashTable(Array(10).fill(null).map(() => []));
    setSearchResult(null);
  };

  const totalItems = hashTable.reduce((sum, bucket) => sum + bucket.length, 0);
  const occupiedBuckets = hashTable.filter(bucket => bucket.length > 0).length;
  const loadFactor = (totalItems / hashTable.length).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Hash Table</h2>
        <p className="text-gray-400">Key-Value pairs with O(1) average access time</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Insert */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-green-400" />
            Insert Key-Value
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <input
              type="text"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={insert}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
            >
              Insert
            </button>
            {key && (
              <div className="text-center p-3 bg-purple-600/20 rounded-lg">
                <Hash className="h-4 w-4 inline mr-2" />
                <span className="text-purple-300">
                  Hash({key}) = {hashFunction(key)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-400" />
            Search Key
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter key to search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={search}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Search
            </button>
            {searchResult !== null && (
              <div className={`text-center p-3 rounded-lg ${
                searchResult === 'Not found' 
                  ? 'bg-red-600/20 text-red-300' 
                  : 'bg-green-600/20 text-green-300'
              }`}>
                Result: {searchResult}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hash Table Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Hash Table Contents</h3>
          <button
            onClick={clear}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid gap-3">
          {hashTable.map((bucket, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                {index}
              </div>
              <div className="flex-1 min-h-12 bg-gray-800/50 rounded-lg flex items-center px-4">
                {bucket.length === 0 ? (
                  <span className="text-gray-500">Empty</span>
                ) : (
                  <div className="flex space-x-2 flex-wrap">
                    {bucket.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{item.key}: {item.value}</span>
                        <button
                          onClick={() => remove(index, itemIndex)}
                          className="text-red-300 hover:text-red-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{totalItems}</div>
          <div className="text-gray-400">Total Items</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{occupiedBuckets}</div>
          <div className="text-gray-400">Occupied Buckets</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{loadFactor}</div>
          <div className="text-gray-400">Load Factor</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">O(1)</div>
          <div className="text-gray-400">Avg Complexity</div>
        </div>
      </div>
    </div>
  );
};

export default HashTable;
