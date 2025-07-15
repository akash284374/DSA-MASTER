
import React, { useState } from 'react';
import { Plus, Search, Trash2, FileText } from 'lucide-react';

class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class TrieDS {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let current = this.root;
    for (const char of word.toLowerCase()) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;
    for (const char of word.toLowerCase()) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    return current.isEndOfWord;
  }

  startsWith(prefix: string): string[] {
    let current = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }
    
    const results: string[] = [];
    const dfs = (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        results.push(currentWord);
      }
      for (const char in node.children) {
        dfs(node.children[char], currentWord + char);
      }
    };
    
    dfs(current, prefix.toLowerCase());
    return results;
  }

  delete(word: string): boolean {
    const deleteHelper = (node: TrieNode, word: string, index: number): boolean => {
      if (index === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return Object.keys(node.children).length === 0;
      }

      const char = word[index];
      const childNode = node.children[char];
      if (!childNode) return false;

      const shouldDeleteChild = deleteHelper(childNode, word, index + 1);

      if (shouldDeleteChild) {
        delete node.children[char];
        return !node.isEndOfWord && Object.keys(node.children).length === 0;
      }

      return false;
    };

    return deleteHelper(this.root, word.toLowerCase(), 0);
  }
}

const Trie = () => {
  const [trie] = useState(new TrieDS());
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [insertedWords, setInsertedWords] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInsert = () => {
    if (inputWord.trim()) {
      const word = inputWord.trim().toLowerCase();
      trie.insert(word);
      setInsertedWords(prev => [...new Set([...prev, word])]);
      setInputWord('');
    }
  };

  const handleSearch = () => {
    if (searchWord.trim()) {
      const found = trie.search(searchWord.trim());
      setSearchResult(found ? `"${searchWord}" found in Trie` : `"${searchWord}" not found`);
      
      // Get suggestions
      const prefixSuggestions = trie.startsWith(searchWord.trim());
      setSuggestions(prefixSuggestions.slice(0, 5));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchWord(value);
    if (value.trim()) {
      const prefixSuggestions = trie.startsWith(value.trim());
      setSuggestions(prefixSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const clear = () => {
    // Clear the trie by recreating it
    Object.keys(trie.root.children).forEach(key => delete trie.root.children[key]);
    setInsertedWords([]);
    setSearchResult('');
    setSuggestions([]);
  };

  const removeWord = (word: string) => {
    trie.delete(word);
    setInsertedWords(prev => prev.filter(w => w !== word));
    // Refresh suggestions if search word is active
    if (searchWord.trim()) {
      const prefixSuggestions = trie.startsWith(searchWord.trim());
      setSuggestions(prefixSuggestions.slice(0, 5));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Trie (Prefix Tree)</h2>
        <p className="text-gray-400">Efficient string storage and prefix-based search</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Insert Words */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Insert Words</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter word"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={handleInsert}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Insert Word</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-400" />
            Search & Autocomplete
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search word or prefix"
              value={searchWord}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Search Word
            </button>
            {searchResult && (
              <div className={`text-center p-3 rounded-lg ${
                searchResult.includes('found in') 
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
                <div className="text-green-400 font-bold">O(m)</div>
                <div className="text-gray-400">Insert</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-blue-400 font-bold">O(m)</div>
                <div className="text-gray-400">Search</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-purple-400 font-bold">O(m)</div>
                <div className="text-gray-400">Prefix</div>
              </div>
              <div className="bg-white/10 p-2 rounded">
                <div className="text-yellow-400 font-bold">O(n)</div>
                <div className="text-gray-400">Space</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Autocomplete Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stored Words */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-green-400" />
          Stored Words ({insertedWords.length})
        </h3>
        
        {insertedWords.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">🌳</div>
            <p>No words stored. Insert some words to build the Trie!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {insertedWords.map((word, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-lg text-center relative group">
                <span className="text-sm font-medium">{word}</span>
                <button
                  onClick={() => removeWord(word)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tree Visualization Info */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Trie Structure Properties</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-400">Advantages:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Fast prefix-based searches</li>
              <li>• Efficient autocomplete</li>
              <li>• Memory sharing for common prefixes</li>
              <li>• No hash collisions</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-400">Use Cases:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Search engines</li>
              <li>• Autocomplete systems</li>
              <li>• Spell checkers</li>
              <li>• Dictionary lookups</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{insertedWords.length}</div>
          <div className="text-gray-400">Words</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{suggestions.length}</div>
          <div className="text-gray-400">Suggestions</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {insertedWords.length > 0 ? Math.max(...insertedWords.map(w => w.length)) : 0}
          </div>
          <div className="text-gray-400">Max Length</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">Tree</div>
          <div className="text-gray-400">Structure</div>
        </div>
      </div>
    </div>
  );
};

export default Trie;
