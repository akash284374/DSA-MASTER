
import React, { useState } from 'react';
import { Hash, Plus, Search, Trophy, RotateCcw } from 'lucide-react';

interface HashEntry {
  key: string;
  value: string;
  hash: number;
}

const HashTableGame = () => {
  const [hashTable, setHashTable] = useState<(HashEntry | null)[]>(new Array(7).fill(null));
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState('');

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % hashTable.length;
  };

  const insert = () => {
    if (!inputKey.trim() || !inputValue.trim()) return;

    const hash = hashFunction(inputKey);
    let index = hash;
    let attempts = 0;

    // Linear probing for collision resolution
    while (hashTable[index] !== null && attempts < hashTable.length) {
      if (hashTable[index]?.key === inputKey) {
        setGameStatus(`Key "${inputKey}" already exists! Updated value.`);
        const newTable = [...hashTable];
        newTable[index] = { key: inputKey, value: inputValue, hash };
        setHashTable(newTable);
        setInputKey('');
        setInputValue('');
        setMoves(moves + 1);
        return;
      }
      index = (index + 1) % hashTable.length;
      attempts++;
    }

    if (attempts >= hashTable.length) {
      setGameStatus('Hash table is full!');
      return;
    }

    const newTable = [...hashTable];
    newTable[index] = { key: inputKey, value: inputValue, hash };
    setHashTable(newTable);
    setScore(score + (attempts === 0 ? 10 : 5)); // Bonus for no collision
    setMoves(moves + 1);
    setGameStatus(attempts > 0 ? `Collision resolved with ${attempts} probes!` : 'Perfect hash!');
    setInputKey('');
    setInputValue('');
  };

  const search = () => {
    if (!searchKey.trim()) return;

    const hash = hashFunction(searchKey);
    let index = hash;
    let attempts = 0;

    while (hashTable[index] !== null && attempts < hashTable.length) {
      if (hashTable[index]?.key === searchKey) {
        setGameStatus(`Found "${searchKey}" at index ${index} with value "${hashTable[index]?.value}"`);
        setScore(score + 5);
        setSearchKey('');
        return;
      }
      index = (index + 1) % hashTable.length;
      attempts++;
    }

    setGameStatus(`Key "${searchKey}" not found!`);
    setSearchKey('');
  };

  const reset = () => {
    setHashTable(new Array(7).fill(null));
    setScore(0);
    setMoves(0);
    setGameStatus('');
    setInputKey('');
    setInputValue('');
    setSearchKey('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <Hash className="h-8 w-8 mr-3 text-yellow-400" />
          Hash Table Challenge
        </h2>
        <p className="text-gray-400">Master hash functions and collision resolution</p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-400">{score}</div>
          <div className="text-gray-400 text-sm">Score</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{moves}</div>
          <div className="text-gray-400 text-sm">Operations</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {hashTable.filter(entry => entry !== null).length}
          </div>
          <div className="text-gray-400 text-sm">Entries</div>
        </div>
      </div>

      {/* Hash Table Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Hash Table (Size: 7)</h3>
        <div className="grid gap-2">
          {hashTable.map((entry, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-white/10 rounded-lg">
              <div className="w-8 text-center text-gray-400 font-mono">{index}</div>
              <div className="flex-1 min-h-[40px] bg-gray-700 rounded-lg flex items-center px-4">
                {entry ? (
                  <div className="flex justify-between w-full">
                    <span className="text-purple-400 font-mono">
                      "{entry.key}" → "{entry.value}"
                    </span>
                    <span className="text-gray-400 text-sm">
                      hash: {entry.hash}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">empty</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-green-400" />
            Insert Key-Value Pair
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <input
              type="text"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && insert()}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={insert}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
            >
              Insert
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-400" />
            Search Key
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter key to search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && search()}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={search}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Search
            </button>
            <button
              onClick={reset}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Game Status */}
      {gameStatus && (
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <p className="text-purple-300">{gameStatus}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
        <ul className="text-gray-300 space-y-2 text-sm">
          <li>• Insert key-value pairs and watch hash collision resolution</li>
          <li>• Search for keys to understand hash table lookup</li>
          <li>• Earn points for successful operations (10 for perfect hash, 5 for resolved collision)</li>
          <li>• Learn about linear probing and hash functions</li>
        </ul>
      </div>
    </div>
  );
};

export default HashTableGame;
